// import { runFinanceAgent } from '@/lib/agent';
// import { auth } from '@clerk/nextjs';
// import { db } from '@/lib/prisma';

// export async function POST(req) {
//   console.log('[insight] called');
  
//   const { userId: clerkUserId } = auth();
//   if (!clerkUserId) {
//     return Response.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const user = await db.user.findUnique({
//     where: { clerkUserId }
//   });
  
//   if (!user) {
//     return Response.json({ error: 'User not found in DB' }, { status: 404 });
//   }

//   try {
//     const { input } = await req.json();
//     const result = await runFinanceAgent(input, user.id);
//     console.log('[insight] agent response:', result);
//     return Response.json({ response: result });
//   } catch (err) {
//     console.error(err);
//     return Response.json({ error: 'Agent crashed' }, { status: 500 });
//   }
// }