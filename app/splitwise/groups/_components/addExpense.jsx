"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React,{useState,useEffect} from "react";
import { createExpense } from "@/actions/createsplitwise";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {MultiSelect} from "@/components//muliselect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { SplitSquareHorizontal } from 'lucide-react';

export default function AddExpenseform({groupId}) {
 
  const [description, setDescription] = useState("");
  const [initialPayer, setInitialPayer] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

   const { user } = useUser();
 



  
async function handleCreate() {
  setLoading(true);

  try {

    
    const { expense, error } = await createExpense(
      groupId, // Assuming you have access to the group ID
      description,
amount,
      category,

    );

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Expense created successfully!");
    console.log("Expense created:", expense);

    // Reset form
   
    setDescription("");
   
    setAmount("");
    setCategory("");
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to create expense. Please try again.");
  } finally {
    setLoading(false);
  }
}


  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 px-4 hover:bg-gray-50 transition-all">
                          <SplitSquareHorizontal size={24} color="#4CAF50" />
                          <span>Create New Expense</span>
                        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new Expense form</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
       
          <Textarea
            placeholder="Description of the expense"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        




          <Input
            type="number"
            placeholder="Total Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Select onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Expense"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
