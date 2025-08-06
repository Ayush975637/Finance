"use server";
import { ChatGroq } from "@langchain/groq";
import{getMemoryForUser} from "@/lib/memory";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { TransactionsTool } from "@/lib/tools/transactionsTool";
import { TransactionsToolx } from "@/lib/tools/split";
import { CombinedTransactionTool} from "@/lib/tools/combinedTransaction";
import { AnalyticsTool } from "./tools/analyticsTool";

import "dotenv/config";
import { Combine } from "lucide-react";

export async function runFinanceAgent(input, userId,context) {
  
const memory = getMemoryForUser(userId,context);
  const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
  model: "compound-beta",

    temperature: 0.7,
    maxTokens: 128,
    maxRetries: 2,
    agentType: "zero-shot-react-description",
    agentArgs: {
   prefix: `
You're a smart, friendly financial assistant for a personal finance app.
You always:
- Speak in easy, clear sentences
- Personalize replies based on user's spending
- Use actual past transactions or summaries
- Never use complex finance terms unless asked

You remember what the user has said before and help like a real human.
`

,
    },

     
    verbose: true,
    streaming:true,
 

  });
  const tools = [
    TransactionsTool(userId),
    AnalyticsTool(userId),
    TransactionsToolx(userId),
    CombinedTransactionTool(userId),
  ];

  const executor = await initializeAgentExecutorWithOptions(
    tools,
    llm,
    { agentType: "zero-shot-react-description", verbose: true,memory, }
  );
  const finalInput = context 
  ? `${context.trim()}\nUser: ${input}`
  : input;

  const result = await executor.invoke({input: finalInput });
  console.log("Agent full result:", result);
  return result.output;
}
