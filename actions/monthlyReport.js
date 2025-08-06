"use server";
import { runFinanceAgent } from "@/lib/agent";
import { auth } from "@clerk/nextjs/server"; // or however you handle auth
import { db } from "@/lib/prisma";
import {sendEmail} from "@/actions/send-email"
import { getAiAnalysis } from "../lib/groq";



export async function generateMonthlyReport(){
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return { error: "Unauthorized" };

   const user = await db.user.findUnique({
      where: { clerkUserId }
    });
    if (!user) return { error: "User not found in DB" };
 const start = new Date();
  start.setDate(1);
  const end = new Date();
  const transactions=await db.transaction.findMany({


    where:{
        userId:user.id,
date:{
        gte:start,
        lte:end,

    }


    }

    

  })
   if (transactions.length === 0) {
    return { aiResponse: "No transactions found for this month." };
  }

const total=transactions.reduce((acc,tx)=>acc+tx.amount,0);
const food=transactions.filter(t=>t.category=='food').reduce((a,b)=>a+b.amount,0);
const transport=transactions.filter(t=>t.category=='transportation').reduce((a,b)=>a+b.amount,0);

  const prompt = `
You are a financial advisor AI. Analyze this user’s monthly data:

Total Spent: ₹${total}
Top Categories: 
- Food: ₹${food}

- Transport: ₹${transport}

Give a short summary with emojis,use simple and cool format  and charts  and 2 tips to save more next month and not use stars  make more cool as possible use emojis more .
`;

  const aiResponse = await getAiAnalysis(prompt);
  await sendEmail(user.id,`${user.name} this is your monthly expense report`,aiResponse)
  return { aiResponse };



}