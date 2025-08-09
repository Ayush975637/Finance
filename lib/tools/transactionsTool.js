// import { Tool } from "@langchain/core/tools";
import { DynamicTool } from "langchain/tools";
import { getUserTransactions } from "@/lib/transactions";

export function TransactionsTool(userId) {
  return new DynamicTool({
    name: "fetch_user_transactions",
    description: "Fetch user's transactions from the database",
    func: async () => {
      const txns = await getUserTransactions(userId);
       if (!txns || txns.length === 0) return "No transactions found.";
      return txns.map(t => {
  const date = new Date(t.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  const typeIcon = t.type === "EXPENSE" ? "🔻" : "🔺";
  const typeText = t.type === "EXPENSE" ? "Expense" : "Income";

  const recurringText = t.isRecurring
    ? `🔁 Recurs ${t.recurringInterval?.toLowerCase()} (Next: ${t.nextRecurringDate ? new Date(t.nextRecurringDate).toLocaleDateString("en-IN") : "unknown"})`
    : "One-time";

  const statusEmoji = t.status === "COMPLETED" ? "✅" :
                      t.status === "PENDING" ? "⏳" : "❌";

  const receipt = t.receiptUrl ? `🧾 Receipt: ${t.receiptUrl}` : "";

  return `${statusEmoji} ${typeIcon} On ${date}, ₹${t.amount} was ${t.type === "EXPENSE" ? "spent" : "received"} for ${t.category} (${t.description || "No description"}).
→ Type: ${typeText}
→ Recurring: ${recurringText}
→ Account ID: ${t.accountId}
${receipt}
`;
}).join("\n");

     
    }
  })
}
