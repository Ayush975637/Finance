export const getExpenses = () => {
  // Mock data: Normally this would come from Supabase or Prisma
  return [
    { category: "Food", amount: 150 },
    { category: "Transport", amount: 80 },
    { category: "Entertainment", amount: 200 },
    { category: "Food", amount: 100 },
  ];
};
