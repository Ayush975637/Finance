"use client"

import React, { useState, useEffect,use } from "react";
import AddExpenseform from "../_components/addExpense";
import { getGroupById } from "../../../../actions/createsplitwise";
import { getUserBalanceInGroup } from "../../../../actions/createsplitwise";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Settings, Receipt, Filter, Plus, 
  ArrowUp, ArrowDown, User, Loader2, IndianRupee
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox";
export default function GroupDetail({ params }) {
  const [error, setError] = useState(null);
  const { id } = use(params);
  const [group, setGroup] = useState({});
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
const [balance, setBalances] = useState(null);

useEffect(() => {
  const fetchBalance = async () => {
    const result = await getUserBalanceInGroup(id); 
    // Pass current group ID
    console.log(result);
    
    setBalances(result);
  };
  fetchBalance();
}, []);

  useEffect(() => {
    async function fetchGroup() {
      const { group, error } = await getGroupById(id);
      if (error) {
        setError(error);
      } else {
        setGroup(group);
      }
      setLoading(false);
    }

    fetchGroup();



  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!group) return <div>Group not found</div>;

//  const balances = {};
//   group.expenses?.forEach(expense => {
//     if (!balances[expense.paidById]) balances[expense.paidById] = 0;
//     balances[expense.paidById] += expense.amount;
    
//     expense.splits?.forEach(split => {
//       if (!balances[split.userId]) balances[split.userId] = 0;
//       balances[split.userId] -= split.amount;
//     });
//   });


  return (
 <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 max-w-7xl mx-auto mt-18"
    >
      {/* Group Header */}
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-center mb-8"
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.02 }}
        >
          {group.name}
        </motion.h2>
        {group.description && (
          <motion.p 
            className="text-lg text-amber-500 mt-5 font-medium max-w-2xl mx-auto "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {group.description}
          </motion.p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Members & Balances */}
        <div className="space-y-6">
          {/* Members Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span>Members</span>
                  </CardTitle>
                  {/* <Badge variant="outline" className="px-3 py-1">
                    {group.members?.length || 0}
                  </Badge> */}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <AnimatePresence>
                  {group.members?.map((member, index) => (
                    <motion.div
                      key={member.userId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                    >
                      <Avatar>
                        <AvatarImage src={member.user.image} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.user.name}</p>
                        <p className="text-sm text-gray-500">{member.user.email}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>



{/* Balances Card */}
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.4 }}
>
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2">
        <div className="flex items-center">
          <ArrowUp className="h-4 w-4 text-green-500" />
          <ArrowDown className="h-4 w-4 text-red-500" />
        </div>
        <span>Balances</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <AnimatePresence>
        {balance?.owedBy?.length > 0 && (
          <div className="space-y-1">
            <h2 className="font-semibold text-red-500">You Owe</h2>
            {balance.owedBy.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="flex items-center justify-between border border-red-100 rounded-lg p-2 bg-red-50"
              >
                <div>
                  <p className="font-medium">{entry.name}</p>
                  <p className="text-xs text-gray-500">{entry.email}</p>
                </div>
                <div className="text-red-600 font-bold">
                  -₹{entry.amount.toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {balance?.owedTo?.length > 0 && (
          <div className="space-y-1 mt-4">
            <h2 className="font-semibold text-green-500">Owes You</h2>
            {balance.owedTo.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="flex items-center justify-between border border-green-100 rounded-lg p-2 bg-green-50"
              >
                <div>
                  <p className="font-medium">{entry.name}</p>
                  <p className="text-xs text-gray-500">{entry.email}</p>
                </div>
                <div className="text-green-600 font-bold">
                  +₹{entry.amount.toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {(!balance?.owedBy?.length && !balance?.owedTo?.length) && (
          <p className="text-gray-500 text-center">No balances yet in this group.</p>
        )}
      </AnimatePresence>
    </CardContent>
  </Card>
</motion.div>

          {/* Balances Card */}
          {/* <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 text-green-500" />
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  </div>
                  <span>Balances</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <AnimatePresence>
                  {balance?.owedBy.length > 0 && (
  <>
    <h2>You Owe:</h2>
    {balance.owedBy.map((entry, index) => (
      <p key={index}>You owe {entry.name} ₹{entry.amount.toFixed(2)}</p>
    ))}
  </>
)}

{balance?.owedTo.length > 0 && (
  <>
    <h2>Owes You:</h2>
    {balance.owedTo.map((entry, index) => (
      <p key={index}>{entry.name} owes you ₹{entry.amount.toFixed(2)}</p>
    ))}
  </>
)}

               
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div> */}
        </div>

        {/* Right Column - Expenses */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Expense Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end"
          >
            <AddExpenseform groupId={params.id} />
          </motion.div>

          {/* Expenses Table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="hover:shadow-md transition-shadow overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-blue-500" />
                    <span>Recent Expenses</span>
                  </CardTitle>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-[120px]">Check</TableHead>
                      <TableHead className="w-[120px]">Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="ml-10">Paid By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      { group && group.expenses?.length > 0 ? (
                        group.expenses.map((expense) => (
                          <motion.tr
                            key={expense.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="hover:bg-gray-50"
                          >
                            <TableCell><Checkbox></Checkbox></TableCell>
                            <TableCell className="font-medium">
                               {/* {format(new Date(transaction.date), "PP")} */}
                              {format(new Date(expense.createdAt), "PPP")}
                            </TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {expense.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              <div className="flex items-center justify-end gap-1 text-red-600">
                                -<IndianRupee className="h-3.5 w-3.5" />
                                {expense.amount}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={expense.paidBy.image} />
                                  <AvatarFallback className="text-xs">
                                    {expense.paidBy.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{expense.paidBy.name}</span>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))
                      ) : (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <TableCell colSpan={5} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center py-6">
                              <Receipt className="h-10 w-10 text-gray-300 mb-2" />
                              <p className="text-gray-500">No expenses yet</p>
                              <p className="text-sm text-gray-400">
                                Add your first expense to get started
                              </p>
                            </div>
                          </TableCell>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>


  );
}
