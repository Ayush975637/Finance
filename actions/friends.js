"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { toast } from "sonner"

export async function getCurrentDbUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return user;
}

export async function getfriends(email) {
 
 const friend = await db.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true , imageUrl: true },
  });
  if (!friend) {
throw new Error("User not found");
  }

return friend;
}
export async function requestfriend(clerkUserId,friendId) {
 
     const user = await db.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    throw new Error("Logged-in user not found in database");
  }
    const existing = await db.friendship.findFirst({
    where: {
    //   userId,
    userId: user.id,
      friendId
    }
  });
   if (existing) {
    return { success: false, message: "Friend request already sent" };
  }
    const newFriend = await db.friendship.create({
        data: {
        // userId,
         userId: user.id,
        friendId,
        
        },
    });

return { success: true, data: newFriend };
}
export async function getAllfriend( clerkUserId ) {
 
     const user = await db.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    throw new Error("Logged-in user not found in database");
  }
    const friends = await db.friendship.findMany({
        where: {
        userId:user.id
        },
        include: {
        friend: {
            select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
             clerkUserId: true  
            },
        },
        },
    });
    
    return friends.map((f) => ({
        id: f.friend.clerkUserId,
        name: f.friend.name,
        email: f.friend.email,
        imageUrl: f.friend.imageUrl,
       
    }));
   
}