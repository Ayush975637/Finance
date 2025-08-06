import { db } from '@/lib/prisma';

export const getUserTransactions = async (userId) => {
  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return transactions;
  } catch (error) {
    console.error('Error fetching user transactions:', error);
    throw new Error('Could not fetch transactions');
  }
};