// actions/createsplitwise.ts

"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
export async function createGroup(name, description, clerkIds) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return { error: "Unauthorized" };

  try {
    // Get internal DB user ID of current user
    const creator = await db.user.findUnique({
      where: { clerkUserId }
    });

    if (!creator) return { error: "User not found in DB" };
const filteredClerkIds = clerkIds.filter((id) => typeof id === "string" && id.trim() !== "");
    if (filteredClerkIds.length === 0) return { error: "No valid Clerk IDs provided" };
    // Fetch all users from DB matching the given Clerk IDs
    const users = await db.user.findMany({
      where: {
        clerkUserId: {
          in: filteredClerkIds
        }
      }
    });

    // Get internal DB IDs
    const internalUserIds = users.map(u => u.id);

    const group = await db.splitGroup.create({
      data: {
        name,
        description,
        createdBy: creator.id,
        members: {
          create: internalUserIds.map((id) => ({
            user: { connect: { id } }
          }))
        }
      }
    });

    return { group };
  } catch (error) {
    console.error("Error creating group:", error);
    return { error: "Failed to create group" };
  }
}

export async function getAllGroups() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return { error: "Unauthorized" };

  try {
    // Get internal DB user ID of current user
    const user = await db.user.findUnique({
      where: { clerkUserId }
    });

    if (!user) return { error: "User not found in DB" };

    const groups = await db.splitGroup.findMany({
      where: {
        members: {
          some: {
            userId: user.id
          }
        }
      },
      include: {
        members: {
          include: {
            user: true
          }
        }
      }
    });

    return { groups };
  } catch (error) {
    console.error("Error fetching groups:", error);
    return { error: "Failed to fetch groups" };
  }
}

export async function createExpense(
  groupId,
  description,
  amount,
  category
  
  
) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return { error: "Unauthorized" };

  try {
    // Get internal DB user ID of current user
    const user = await db.user.findUnique({
      where: { clerkUserId }
    });

    const members=await db.splitGroup.findUnique({
      where: { id: groupId },
      select: {
        members: {
          select: {
            userId: true
          }
        }
      }
    });
    const equalshare=amount/members.members.length;
   const splitData = members.members.map((member) => ({
  userId: member.userId,
  amount: parseFloat(equalshare),
}));

    if (!user) return { error: "User not found in DB" };

    const expense = await db.splitExpense.create({
      data: {
        groupId,
        description,
        amount: parseFloat(amount),
        category,
        paidById: user.id,
        splits: {
         create: splitData
        }
      }
    });

    revalidatePath(`/splitwise/groups/${groupId}`);
    return { expense };
  } catch (error) {
    console.error("Error creating expense:", error);
    return { error: "Failed to create expense" };
  }
} 

export async function getGroupById(groupId) {

    const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return { error: "Unauthorized" };
  try {
    // Get internal DB user ID of current user
    const user = await db.user.findUnique({
      where: { clerkUserId }
    });

    if (!user) return { error: "User not found in DB" };

    const group = await db.splitGroup.findUnique({
      where: { id: groupId },
      include: {
        members: {
          include: {
            user: true
          }
        },
        expenses: {
          include: {
            splits: true,
            paidBy: true
          }
        }
      }
    });

    if (!group) return { error: "Group not found" };

    return { group };
  } catch (error) {
    console.error("Error fetching group:", error);
    return { error: "Failed to fetch group" };
  }


}

export async function getUserBalanceInGroup(groupId){
const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return { error: "Unauthorized" };

  const user = await db.user.findUnique({ where: { clerkUserId } });
  if (!user) return { error: "User not found" };

  const expenses=await  db.splitExpense.findMany({
    where:{
      groupId
    },
    include:{
      splits: {
      include: {
        user: true, // ✅ This is missing in your code
      }
    }, paidBy:true,

  }
  });
 const owedBy = []; 
  const owedTo = [];

  for(const expense of expenses){
    for(const split of expense.splits){

      if(split.userId===user.id && split.userId!=expense.paidById){
        owedBy.push({
          name: expense.paidBy.name,
          email: expense.paidBy.email,
          amount: Number(split.amount),
        });
      }

      if(split.userId!==user.id &&expense.paidById===user.id){
        owedTo.push({
          name: split.user.name,
          email: split.user.email,
          amount: Number(split.amount),
        })
      }

    }
  }
 return {
    owedBy,
    owedTo,
  };

}
export async function getUserBalanceForAllGroup(groupId){
const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return { error: "Unauthorized" };

  const user = await db.user.findUnique({ where: { clerkUserId } });
  if (!user) return { error: "User not found" };

  const allexpenses=await  db.splitExpense.findMany({
    
    include:{
      splits:{
        include:{
          user:true
        }
      },
      paidBy:true,
    }

    
  });
   let totalOwedByMe = 0;
  let totalOwedToMe = 0;


  for(const expense of allexpenses){
    for(const split of expense.splits){

      if(split.userId===user.id && split.userId!=expense.paidById){
         totalOwedByMe += Number(split.amount);
      }

      if(split.userId!==user.id &&expense.paidById===user.id){
         totalOwedToMe += Number(split.amount);
      }

    }
  }
 return {
    totalOwedByMe,
    totalOwedToMe,
    netBalance: totalOwedToMe - totalOwedByMe,
  };

}

export async function getRecentActivities() {

const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return { error: "Unauthorized" };

  const user = await db.user.findUnique({ where: { clerkUserId } });
  if (!user) return { error: "User not found" };

  const expenses = await db.splitExpense.findMany({
    where: {
      OR: [
        { paidById: user.id },
        { splits: { some: { userId: user.id } } },
      ],
    },
    include: {
      splits: true,
      paidBy: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5, // Only latest 5
  });

  return expenses.map((expense) => {
    const userSplit = expense.splits.find(split => split.userId === user.id);
    return {
      title: expense.description, // like "Dinner with friends"
      date: expense.createdAt,
      amount: userSplit?.amount ?? 0,
      isPaidByMe: expense.paidById === user.id,
    };
  });
}
