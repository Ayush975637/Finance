"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { toast } from "sonner"

export async function askAi(message) {
     const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return { error: "Unauthorized" };

   const user = await db.user.findUnique({
      where: { clerkUserId }
    });
    if (!user) return { error: "User not found in DB" };

await db.chatMessage.create({

    data:{
userId:user.id,
role:"user",
content:message,

    }

})

const past = await db.chatMessage.findMany({
    where: { userId:user.id },
    orderBy: { createdAt: "asc" },
    take: 10,
  });

  const context=past.map(m=>`${m.role}:${m.content}`).join("\n");


await db.chatMessage.create({
    data:{
        userId:user.id,
        role:"ai",
        content:aiReply,
    }
})


 return aiReply   
}