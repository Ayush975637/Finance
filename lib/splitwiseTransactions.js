import { db } from '@/lib/prisma';

export const getsplitTransactions = async (userId) => {
  try {
    const splittransactions = await db.split_expense.findMany({
      where:{
paidById:userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return splittransactions;
  } catch (error) {
    console.error('Error fetching split transactions:', error);
    throw new Error('Could not fetch transactions');
  }
};