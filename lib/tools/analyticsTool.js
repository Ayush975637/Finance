
import { DynamicTool } from "langchain/tools";
// import { getUserTransactions } from "@/lib/transactions";
import { db } from "@/lib/prisma";
// import { format } from "date-fns";
export function AnalyticsTool(userId) {
  return new DynamicTool({
    name: "analyze_spending_patterns",
    description: "Analyze user's transactions and return personalized financial insights",
    func: async () => {
  const today = new Date();
      const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);



  // 📌 Fetch transactions for this and last month
      const [thisMonthTxns, lastMonthTxns] = await Promise.all([
        db.transaction.findMany({
          where: {
            userId,
            date: { gte: firstDayThisMonth, lte: today }
          }
        }),
        db.transaction.findMany({
          where: {
            userId,
            date: { gte: firstDayLastMonth, lt: firstDayThisMonth }
          }
        }),
      ]);



      const sumByCategory = (txns) =>
        txns.reduce((acc, txn) => {
          acc[txn.category] = (acc[txn.category] || 0) + Number(txn.amount);
          return acc;
        }, {});

      const totalThisMonth = thisMonthTxns.reduce((acc, t) => acc + Number(t.amount), 0);
      const totalLastMonth = lastMonthTxns.reduce((acc, t) => acc + Number(t.amount), 0);

      const current = sumByCategory(thisMonthTxns);
      const previous = sumByCategory(lastMonthTxns);

      const sorted = Object.entries(current).sort((a, b) => b[1] - a[1]);

      let insights = `📊 Here's your monthly analysis:\n`;
      insights += `🧾 Total spent this month: ₹${totalThisMonth.toFixed(2)}\n`;
      insights += `📉 Change from last month: ₹${(totalThisMonth - totalLastMonth).toFixed(2)}\n\n`;

      if (sorted.length > 0) {
        const [topCategory, topAmount] = sorted[0];
        const prevTopAmount = previous[topCategory] || 0;
        const diff = topAmount - prevTopAmount;

        insights += `🔥 Top Category: ${topCategory} — ₹${topAmount.toFixed(2)} (⬆️ ₹${diff.toFixed(2)} from last month)\n`;
      }

      insights += `\n📂 Breakdown:\n`;
      for (let [cat, amt] of sorted) {
        const change = amt - (previous[cat] || 0);
        insights += `- ${cat}: ₹${amt.toFixed(2)} (${change >= 0 ? '⬆️' : '⬇️'} ₹${Math.abs(change).toFixed(2)})\n`;
      }

      // ✨ Smart suggestions
      if (totalThisMonth > totalLastMonth * 1.2) {
        insights += `\n⚠️ You've spent significantly more this month. Consider reviewing high-spending categories.`;
      } else {
        insights += `\n✅ You're maintaining your budget well. Great job!`;
      }

      return insights;










//       const txns = await getUserTransactions(userId);

//       if (!txns || txns.length === 0) return "🚫 No transactions found for analysis.";

//       const summary = {};
//       let totalSpent = 0;

//       for (const txn of txns) {
//         const category = txn.category || "Uncategorized";
//         const amount = Number(txn.amount || 0);
//         summary[category] = (summary[category] || 0) + amount;
//         totalSpent += amount;
//       }

//       const entries = Object.entries(summary).sort((a, b) => b[1] - a[1]); // Sort high to low
//       const topCategory = entries[0];

//       // 🧠 Human-style insights
//       const lines = entries.map(([cat, amt]) => `• ${cat}: ₹${amt.toFixed(2)}`);

//       return `📊 Monthly Spending Summary
// ━━━━━━━━━━━━━━━━━━━━━
// 🧾 Total Spent: ₹${totalSpent.toFixed(2)}

// 💸 Top Spending Category: ${topCategory[0]} (₹${topCategory[1].toFixed(2)})

// 🧠 Category-wise Breakdown:
// ${lines.join("\n")}

// 💡 Suggestion:
// You seem to be spending the most on "${topCategory[0]}". Consider setting a budget limit for this category if it's non-essential, or explore ways to optimize it. Small changes here can save big!
// `;
    },
  });
}
