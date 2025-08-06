import { BufferMemory } from "langchain/memory";


const memoryStore = new Map(); // Simple store for sessions in dev

export function getMemoryForUser(userId) {
  if (!memoryStore.has(userId)) {
    memoryStore.set(
      userId,
      new BufferMemory({
        returnMessages: true,
        memoryKey: "chat_history",
           inputKey: "input",
      })
    );
  }

  return memoryStore.get(userId);
}

// import { BufferMemory } from "langchain/memory";
// import { AIMessage, HumanMessage } from "@langchain/core/messages";

// const memoryStore = new Map(); // Simple store for session memory in dev

// export async function getMemoryForUser(userId, contextMessages) {
//   if (!memoryStore.has(userId)) {
//     const memory = new BufferMemory({
//       returnMessages: true,
//       memoryKey: "chat_history",
//       inputKey: "input",
//     });

//     // Inject previous messages as memory
//     if (contextMessages && contextMessages.length) {
//       for (const msg of contextMessages) {
//         if (msg.role === "user") {
//           await memory.chatHistory.addMessage(new HumanMessage(msg.content));
//         } else {
//           await memory.chatHistory.addMessage(new AIMessage(msg.content));
//         }
//       }
//     }

//     memoryStore.set(userId, memory);
//   }

//   return memoryStore.get(userId);
// }

