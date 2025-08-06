// pages/api/ai.js
"use server";
import { runFinanceAgent } from "@/lib/agent";
import { auth } from "@clerk/nextjs/server"; // or however you handle auth
import { db } from "@/lib/prisma";
export async function handler(input) {

  console.log("[insight] called with input:", input);
   const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return { error: "Unauthorized" };

   const user = await db.user.findUnique({
      where: { clerkUserId }
    });
    if (!user) return { error: "User not found in DB" };

console.log(user.id);

console.log("ChatMessage model exists:", db.chatMessage);





  try {

  await db.chatMessage.create({
    data: {
      userId:user.id,
      role: "user",
      content: input,
    },
  });

  const past = await db.chatMessage.findMany({
    where: { userId:user.id },
    orderBy: { createdAt: "asc" },
    take: 10,
  });

  const context = past.map(m => `${m.role}: ${m.content}`).join("\n");



    const result = await runFinanceAgent(input,user.id,context);
     await db.chatMessage.create({
    data: {
      userId:user.id,
      role: "ai",
      content: result,
    },
  });
     console.log("[insight] agent response:", result);
   return { response: result };
  } catch (err) {
    console.error(err);
return { error: "Agent crashed" }; 
  }
}
