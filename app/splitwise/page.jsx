// "use client";

// import React,{  useState,useEffect } from 'react'
// import Dashboard from './_components/dashboard'
// import CreateSplitwiseModal from './_components/creategroup'
// import { Button } from '@/components/ui/button'
// import { Input } from "@/components/ui/input"
// import { motion, AnimatePresence } from "framer-motion";
// import { Search, Trash, X } from "lucide-react";
// import Link from 'next/link'
// import { toast } from "sonner";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { getfriends } from "@/actions/friends";
// import { requestfriend } from "@/actions/friends";
// import { getAllfriend } from "@/actions/friends";
// import { useRouter } from 'next/navigation';
// import { useUser } from "@clerk/nextjs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// const splitwise = () => {
//      const [email, setEmail] = useState("");
//   const [searchResult, setSearchResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const[friends, setFriends] = useState([]);
//   const { user } = useUser();
//   const handleSearch = async () => {

//     if (!email) {
//       toast.error("Please enter an email address");
//       return;
//     }
//     setLoading(true);
//     try {
//       // Simulate an API call to search for a user by email

//       const user= await getfriends(email);
//       if (user) {
//         setSearchResult(user);
//       } else {
//         toast.error("User not found");
//         setSearchResult(null);
//       }
//     } catch (error) {
//       toast.error("Error searching for user");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }
//   const handleAddFriend = async () => {
//  if (!searchResult || !user) return;

//   const res = await requestfriend(user.id, searchResult.id);

//   if (!res.success) {
//     toast.error(res.message);
//     return;
//   }
//     toast.success("Friend added!");
//     setSearchResult(null);
//     setEmail("");
//   }
// useEffect(() => {
//     const fetchFriends = async () => {
//       if (!user) return;
//       try {
//         const friendsList = await getAllfriend(user.id);
//         setFriends(friendsList);
//       } catch (error) {
//         console.error("Error fetching friends:", error);
//       }
//     };
//     fetchFriends();
//   }, [user]);




// //   return (
// //     <div className='mt-25 flex flex-col gap-3 '>
// //         <Dashboard></Dashboard>




// //     <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6 p-4 w-full max-w-4xl mx-auto">
      
// //        <CreateSplitwiseModal></CreateSplitwiseModal>
      

// //       <Tabs defaultValue="account" className="w-full sm:w-[400px]">
// //         <TabsList className="flex w-full justify-around bg-gray-100 rounded-lg shadow-md p-1">
// //           <TabsTrigger value="account" className="w-1/2 text-sm sm:text-base">
// //             Groups
// //           </TabsTrigger>
// //           <TabsTrigger value="password" className="w-1/2 text-sm sm:text-base">
// //             Friends
// //           </TabsTrigger>
// //         </TabsList>

// //         <TabsContent value="account" className="mt-4">
// //           <div className="p-4 bg-white rounded shadow-sm border">
// //             See your Groups
// //           </div>
// //         </TabsContent>

// //         <TabsContent value="password" className="mt-4">
// //           <div className="p-4 bg-white rounded shadow-sm border">
// //                  <h2 className="text-xl font-semibold text-center text-rose-500 shadow-2xl">Add Friend by Email</h2>
// //                  <div className='flex flex-row gap-2 items-center justify-center mt-4'>
// //             <Input 
// //             placeholder="Search Friends"
// //             className="mb-4"
// //             icon={<Search className="w-4 h-4 text-gray-500" />}
// //            value={email}
// //           onChange={(e) => setEmail(e.target.value)}
            
// //             />
// //            <Button onClick={handleSearch} disabled={loading}>
// //           {loading ? "Searching..." : "Search"}
// //         </Button>
// // </div>
// // {searchResult && (
// //         <div className="flex justify-between items-center border p-3 rounded-md bg-gray-50">
// //           <div>
// //             <div className="flex flex-row gap-2">
// //             <Avatar>
// //   <AvatarImage src={searchResult.imageUrl} />
// //   <AvatarFallback>
// //      {searchResult.name?.[0]?.toUpperCase() || "U"}
// //   </AvatarFallback>
// // </Avatar>
// //             <p className="font-medium">{searchResult.name || "Unnamed User"}</p>
// //             </div>
// //             <p className="text-sm text-gray-500">{searchResult.email}</p>
// //           </div>
// //           <Button onClick={handleAddFriend} variant="outline">
// //             Add
// //           </Button>
// //         </div>
// //       )}
// //       {!searchResult && friends.length > 0 && (
// //       <div className="mt-4 space-y-3">
// //         <h3 className="text-lg font-bold text-center">Your Friends</h3>
// //         {friends.map((friend) => (
// //           <div key={friend.id} className="flex items-center gap-3 p-3 bg-gray-50 border rounded-md">
// //             <Avatar>
// //               <AvatarImage src={friend.imageUrl} />
// //               <AvatarFallback>{friend.name?.[0] || "U"}</AvatarFallback>
// //             </Avatar>
// //             <div>
// //               <p className="font-medium">{friend.name}</p>
// //               <p className="text-sm text-gray-500">{friend.email}</p>
// //             </div>
// //           </div>
// //         ))}
// //          </div>
// //     )}

// //  {!searchResult && friends.length === 0 && (
// //       <p className="text-center text-gray-400 mt-6">No friends added yet.</p>
// //     )}




// //           </div>
// //         </TabsContent>
// //       </Tabs>
// //     </div>
 

    
 
// //     </div>
// //   )  
// return (
//   <div className="mt-20 px-4 sm:px-10 flex flex-col gap-6">
//     <Dashboard />
//     <div className="w-full max-w-5xl mx-auto">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
//         <CreateSplitwiseModal />
//       </div>

//       <Tabs defaultValue="account" className="w-full mt-8">
//         <TabsList className="flex w-full justify-around bg-gray-100 rounded-xl shadow-lg p-2">
//           <TabsTrigger value="account" className="w-1/2 text-sm sm:text-base font-semibold">
//             Groups
//           </TabsTrigger>
//           <TabsTrigger value="password" className="w-1/2 text-sm sm:text-base font-semibold">
//             Friends
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="account" className="mt-4">
//           <div className="p-4 bg-white rounded-lg shadow-md border text-center font-semibold text-gray-600">
//             See your Groups
//           </div>
//         </TabsContent>

//         <TabsContent value="password" className="mt-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="p-4 bg-white rounded-xl shadow-lg border"
//           >
//             <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">Add Friend by Email</h2>

//             <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
//               <Input
//                 placeholder="Enter friend’s email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full sm:w-64"
//               />
//               <Button onClick={handleSearch} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
//                 {loading ? "Searching..." : "Search"}
//               </Button>
//             </div>

//             <AnimatePresence>
//               {searchResult && (
//                 <motion.div
//                   key="search-result"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="mt-6 flex items-center justify-between p-4 rounded-md bg-gray-50 shadow-sm border"
//                 >
//                   <div className="flex items-center gap-4">
//                     <Avatar className="ring-2 ring-purple-500">
//                       <AvatarImage src={searchResult.imageUrl} />
//                       <AvatarFallback>{searchResult.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-semibold text-lg">{searchResult.name || "Unnamed User"}</p>
//                       <p className="text-sm text-gray-500">{searchResult.email}</p>
//                     </div>
//                   </div>
//                   <Button onClick={handleAddFriend} variant="outline">
//                     Add
//                   </Button>
//                 </motion.div>
//               )}

//               {!searchResult && friends.length > 0 && (
//                 <motion.div
//                   key="friends-list"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="mt-6 space-y-4"
//                 >
//                   <h3 className="text-xl font-bold text-center text-gray-800">Your Friends</h3>
//                   {friends.map((friend) => (
//                     <motion.div
//                       key={friend.id}
//                       whileHover={{ scale: 1.02 }}
//                       className="flex items-center gap-4 p-4 bg-gray-50 border rounded-lg shadow-sm"
//                     >
//                       <Avatar className="ring-1 ring-gray-300">
//                         <AvatarImage src={friend.imageUrl} />
//                         <AvatarFallback>{friend.name?.[0] || "U"}</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="font-medium">{friend.name}</p>
//                         <p className="text-sm text-gray-500">{friend.email}</p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               )}

//               {!searchResult && friends.length === 0 && (
//                 <motion.p
//                   key="no-friends"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="text-center text-gray-400 mt-8"
//                 >
//                   No friends added yet.
//                 </motion.p>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   </div>
// );
// }

// export default splitwise

"use client";

import React, { useState, useEffect } from 'react'
import Dashboard from './_components/dashboard'
import CreateSplitwiseModal from './_components/creategroup'
import { Button } from '@/components/ui/button'

import { Search, Trash, X, UserPlus } from "lucide-react";
import Link from 'next/link'
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getfriends } from "@/actions/friends";
import { getAllGroups } from "@/actions/createsplitwise";
import { getUserBalanceForAllGroup } from "@/actions/createsplitwise";
import { getRecentActivities } from "@/actions/createsplitwise";

import { requestfriend } from "@/actions/friends";
import { getCurrentDbUser } from "@/actions/friends";
import { getAllfriend } from "@/actions/friends";
import { handler } from "@/actions/insight";
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { formatDistanceToNow } from 'date-fns';
import { set } from 'zod';
const Splitwise = () => {
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [balance, setBalance] = useState(null);
  const [activity,setActivity]=useState(null);
  const { user } = useUser();
 // Temporarily add this to your code

  const [activeTab, setActiveTab] = useState("groups");


  const handleSearch = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    setLoading(true);
    try {
      const user = await getfriends(email);
      if (user) {
        setSearchResult(user);
      } else {
        toast.error("User not found");
        setSearchResult(null);
      }
    } catch (error) {
      toast.error("Error searching for user");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
    const handleAIRequest = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    try {
      const { response } = await handler(input);
      setAiResponse(response);
    } catch (error) {
      setAiResponse("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleAddFriend = async () => {
    if (!searchResult || !user) return;
 
    const res = await requestfriend(user.id, searchResult.id);

    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success("Friend added!");
    setSearchResult(null);
    setEmail("");
    // Refresh friends list
    const friendsList = await getAllfriend(user.id);
    setFriends(friendsList);
  }

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
  useEffect(() => {
    const fetchGroups = async () => {
      if (!user) return;
      try {
        const {groups,error} = await getAllGroups();
        
if(error){
          toast.error("Error fetching groups");
        }

setGroups(groups);
console.log({ groups })
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchGroups();
  }, [user]);
useEffect(() => {
  const fetchBalance = async () => {
    const result = await getUserBalanceForAllGroup(); 
    
    console.log(result);
    
    setBalance(result);
  };
  fetchBalance();
}, []);
useEffect(() => {
  const fetchActivity = async () => {
    const result = await getRecentActivities(); 
    
    console.log(result);
    
    setActivity(result);
  };
  fetchActivity();
}, []);
  

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='mt-25 flex flex-col gap-6 p-4 md:p-6 max-w-6xl mx-auto'
    >
      <Dashboard balance={balance} activity={activity} />
{/* 
  <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Ask AI about your expenses..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <Button 
          onClick={handleAIRequest}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </Button>
      </div>
      
      {aiResponse && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="whitespace-pre-line">{aiResponse}</p>
        </div>
         )}
    </div> */}

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Left Side - Create Group */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-1/2"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-rose-500 text-center">
                Create New Group
              </CardTitle>
            </CardHeader>
            <CardContent className="justify-baseline">
          
          <div className="ml-15 mx-auto">
              <CreateSplitwiseModal className="left-0.5" />
              </div>
              <div className='text-green-300 font-bold text-2xl text-center mt-10'>Your Personal  intelligent Chatbot</div>
  <div className="max-w-4xl mx-auto p-4 ">
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Ask AI about your expenses..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <Button 
          onClick={handleAIRequest}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </Button>
      </div>
      
      {aiResponse && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="whitespace-pre-line">{aiResponse}</p>
        </div>
         )}
    </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Side - Friends/Groups */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full lg:w-1/2"
        >
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-1 h-12">
              <TabsTrigger 
                value="groups" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-300"
              >
                Groups
              </TabsTrigger>
              <TabsTrigger 
                value="friends" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-300"
              >
                Friends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="groups" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="p-4 bg-gradient-to-br from-white to-rose-50 rounded-lg border border-rose-100"
                  >
                   {groups && groups.length ==0 && ( <p className="text-center text-gray-500">No groups yet. Create one to get started!</p>)}
                  </motion.div>

  {groups && groups.length > 0 && (
   
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3"
                      >
                        <h3 className="text-lg font-bold text-center text-rose-500">Your Groups</h3>
                        
                        {groups.map((group) => (
                           <Link href={`/splitwise/groups/${group.id}`} key={group.id} className="mt-4">
                          <motion.div
                            key={group.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <Avatar className="border-2 border-rose-200">
                              <AvatarImage src={group.imageUrl} />
                              <AvatarFallback>{group.name?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{group.name}</p>
                              <p className="text-sm text-gray-500">{group.description}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-rose-400 hover:text-rose-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </motion.div>
                          </Link>
                        ))}
                      </motion.div>
                     
                    )}





                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="friends" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Friends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                      <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search by email"
                          className="pl-10 pr-4 py-2 rounded-full border-rose-200 focus-visible:ring-rose-300"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                      </div>
                      <Button 
                        onClick={handleSearch} 
                        disabled={loading}
                        className="rounded-full bg-rose-500 hover:bg-rose-600 transition-colors duration-300 shadow-sm"
                      >
                        {loading ? (
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="inline-block"
                          >
                            🔍
                          </motion.span>
                        ) : (
                          "Search"
                        )}
                      </Button>
                    </div>

                    <AnimatePresence>
                      {searchResult && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="border-2 border-rose-300">
                              <AvatarImage src={searchResult.imageUrl} />
                              <AvatarFallback>
                                {searchResult.name?.[0]?.toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{searchResult.name || "Unnamed User"}</p>
                              <p className="text-sm text-gray-500">{searchResult.email}</p>
                            </div>
                          </div>
                          <Button 
                            onClick={handleAddFriend} 
                            variant="outline"
                            className="border-rose-300 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-full"
                          >
                            <UserPlus className="mr-2 h-4 w-4" /> Add
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!searchResult && friends.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3"
                      >
                        <h3 className="text-lg font-bold text-center text-rose-500">Your Friends</h3>
                        {friends.map((friend) => (
                          <motion.div
                            key={friend.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <Avatar className="border-2 border-rose-200">
                              <AvatarImage src={friend.imageUrl} />
                              <AvatarFallback>{friend.name?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{friend.name}</p>
                              <p className="text-sm text-gray-500">{friend.email}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-rose-400 hover:text-rose-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {!searchResult && friends.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8"
                      >
                        <div className="mx-auto w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                          <UserPlus className="h-10 w-10 text-rose-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700">No friends yet</h3>
                        <p className="text-gray-500 mt-1">Add friends to start splitting expenses</p>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )  
}

export default Splitwise;
