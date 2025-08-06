// import { Tool } from "@langchain/core/tools";
// import { DynamicTool } from "langchain/tools";
// import { getsplitTransactions } from "@/lib/splitwiseTransactions";
// import { getUserTransactions } from "@/lib/transactions";




// export function CombinedTransactionTool(userId) {
//   return new DynamicTool({
//     name: "fetch_all_user_transactions",
//     description: "Fetch user's personal and group transactions",
//     func: async () => {
//       const normalTx = await getUserTransactions(userId);
//       const groupTx = await getsplitTransactions(userId);

//       const allTx = [
//         ...normalTx.map(t => `Personal:On ${t.date} , ₹${t.amount} spent on ${t.category} `),
//         ...groupTx.map(t => `Group: On ${t.createdAt} , ₹${t.amount} spent on ${t.category}: ${t.description}  `),
//       ];
//       return allTx.join("\n");
//     },
//   });
// }
import { Tool } from "@langchain/core/tools";
import { DynamicTool } from "langchain/tools";
import { getsplitTransactions } from "@/lib/splitwiseTransactions";
import { getUserTransactions } from "@/lib/transactions";

export function CombinedTransactionTool(userId) {
  return new DynamicTool({
    name: "fetch_all_user_transactions",
    description: "Fetch user's personal and group transactions with details",
    func: async () => {
      const normalTx = await getUserTransactions(userId);
      const groupTx = await getsplitTransactions(userId);

      const personalFormatted = normalTx.map(t => {
        const date = new Date(t.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        });

        return `🧾 PERSONAL TRANSACTION
📅 Date: ${date}
💸 Amount: ₹${t.amount}
📂 Category: ${t.category}
📝 Description: ${t.description || "No description"}
🔁 Recurring: ${t.isRecurring ? `Yes (${t.recurringInterval})` : "No"}
🏦 Account ID: ${t.accountId}
⚙️ Status: ${t.status}
-----------------------------`;
      });

      const groupFormatted = groupTx.map(t => {
        const createdDate = new Date(t.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        });
        const updatedDate = new Date(t.updatedAt).toLocaleDateString("en-IN");

        return `👥 GROUP EXPENSE
📅 Date: ${createdDate}
💸 Amount: ₹${t.amount}
📂 Category: ${t.category}
📝 Description: ${t.description || "No description"}
👤 Paid By: ${t.paidBy?.name || "Unknown"} (ID: ${t.paidById})
👪 Group: ${t.group?.name || "Unknown"} (ID: ${t.groupId})
📅 Last Updated: ${updatedDate}
👤 Split Members: ${t.splits?.length || 0}
-----------------------------`;
      });

      return [...personalFormatted, ...groupFormatted].join("\n\n");
    },
  });
}
