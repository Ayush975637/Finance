// import { Tool } from "@langchain/core/tools";
import { DynamicTool } from "langchain/tools";
import { getsplitTransactions } from "@/lib/splitwiseTransactions";

export function TransactionsToolx(userId) {
  return new DynamicTool({
    name: "fetch_group_transactions",
    description: "Fetch user's transactions from the database",
    func: async () => {
      const txns = await getsplitTransactions();
      if (!txns || txns.length === 0) return "No transactions found.";
return txns.map(t => {
  const date = new Date(t.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  const updatedDate = new Date(t.updatedAt).toLocaleDateString("en-IN");

  return `📅 Date: ${date}
💸 Amount: ₹${t.amount}
📂 Category: ${t.category}
🧾 Description: ${t.description || "No description provided"}
👤 Paid By: ${t.paidBy?.name || "Unknown User"} (ID: ${t.paidById})
👥 Group: ${t.group?.name || "Unknown Group"} (ID: ${t.groupId})
🔄 Last Updated: ${updatedDate}
🔗 Splits: ${t.splits?.length || 0} member${t.splits?.length === 1 ? '' : 's'}
-----------------------------`;
}).join("\n\n");


    },
  });
}
