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


import React,{useState,useEffect} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {MultiSelect} from "@/components//muliselect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {createGroup} from "@/actions/createsplitwise";
import { SplitSquareHorizontal } from 'lucide-react';
import { getAllfriend } from "@/actions/friends";
export default function CreateSplitwiseModal() {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [initialPayer, setInitialPayer] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
 const [members, setFriends] = useState([]);
 const [person , setPerson] = useState([]);
   const { user } = useUser();
  
  const friendOptions = members.map((m) => ({
  value: m.id,
  label: m.name || m.email,
}));


   useEffect(() => {
      const fetchFriends = async () => {
        if (!user) return;
        try {
          const friendsList = await getAllfriend(user.id);
          setFriends(friendsList);
        } catch (error) {
          console.error("Error fetching friends:", error);
        }
      };
      fetchFriends();
    }, [user]);
  
async function handleCreate() {
  setLoading(true);

  try {
    // Extract just the IDs from members
    const memberIds = person.map(member => member);
    console.log("Member IDs:", memberIds);
    // Include the current user in the group
    const allMemberIds = [user.id, ...memberIds].filter((id) => id);
    console.log("Members to be added:", allMemberIds);

    const { group, error } = await createGroup(
      groupName, 
      description,
      allMemberIds
    );

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Group created successfully!");
    console.log("Group created:", group);

    // Reset form
    setGroupName("");
    setDescription("");
    setInitialPayer("");
    setAmount("");
    setCategory("");
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to create group");
  } finally {
    setLoading(false);
  }
}
useEffect(() => {
  console.log("Selected people in MultiSelect:", person);
}, [person]);


  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 px-4 hover:bg-gray-50 transition-all">
                          <SplitSquareHorizontal size={24} color="#4CAF50" />
                          <span>Create New Spliwise</span>
                        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new Splitwise Group</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Input
            placeholder="Enter group name (e.g. Goa Trip)"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        





        
<MultiSelect options={friendOptions} selected={person} setSelected={setPerson} />
         
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
