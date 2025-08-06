
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// const Dashboard = () => {
//   return (
//     <div>
//       <Card>
//   <CardHeader>
//     <CardTitle className="text-center text-3xl font-bold  text-red-400">Splitwise Balance</CardTitle>

    
//   </CardHeader>
//   <CardContent className="flex flex-row justify-evenly gap-2 ">
//     <Card className="w-1/3">
//       <CardHeader>
//         <CardTitle className="text-center sm:text-2xl font-semibold">Owe</CardTitle>
//       </CardHeader>
//       <CardContent className="text-center sm:text-2xl font-bold text-red-500">
//         $50.00
//       </CardContent>
//     </Card>
//     <Card className="w-1/3">
//       <CardHeader>
//         <CardTitle className="text-center sm:text-xl font-semibold">Owed</CardTitle>
//       </CardHeader>
//       <CardContent className="text-center sm:text-2xl font-bold text-green-500">
//         $30.00
//       </CardContent>
//     </Card>
//     <Card className="w-1/3">
//       <CardHeader>
//         <CardTitle className="text-center  font-semibold sm:text-xl ">Total balance</CardTitle>
//       </CardHeader>
//       <CardContent className="text-center sm:text-2xl font-bold text-red-500">
//         $20.00
//       </CardContent>
//     </Card>
//   </CardContent>

// </Card>





//     </div>
//   )
// }

// export default Dashboard
"use client"
import { useState,useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { motion } from "framer-motion"
import RupeeLoader from "@/components/loader";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"
import { formatDistanceToNow } from 'date-fns';
const Dashboard = ({balance,activity}) => {
 const [loading, setLoading] = useState(true);
useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

   if (!balance) {
    return <RupeeLoader />;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="bg-gradient-to-br from-white to-rose-50 border-rose-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
            Splitwise Balance
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex flex-col sm:flex-row justify-between gap-4 p-6">
          {/* Owe Card */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-1/3"
          >
            <Card className="h-full border-rose-100 bg-rose-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-rose-700">
                  YOU OWE
                </CardTitle>
                <motion.div
                  animate={{ rotate: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <ArrowDown className="h-4 w-4 text-rose-500" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rose-600">${balance.totalOwedByMe}</div>
                <p className="text-xs text-rose-500 mt-1">to 3 people</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Owed Card */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-1/3"
          >
            <Card className="h-full border-green-100 bg-green-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700">
                  YOU ARE OWED
                </CardTitle>
                <motion.div
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <ArrowUp className="h-4 w-4 text-green-500" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${balance.totalOwedToMe}</div>
                <p className="text-xs text-green-500 mt-1">from 2 people</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Total Balance Card */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-1/3"
          >
            <Card className={balance.netBalance >= 0 ? "text-green-600 h-full border-green-100 bg-green-50" : "text-red-600  h-full border-red-100 bg-red-50"}>
              <CardHeader className={balance.netBalance >= 0 ? "text-green-600 flex flex-row items-center justify-between space-y-0 pb-2" : "text-red-600  flex flex-row items-center justify-between space-y-0 pb-2"}>
                <CardTitle className={balance.netBalance >= 0 ? "text-green-600 text-sm  font-medium" : "text-red-600   text-sm font-medium "}>
                  TOTAL BALANCE
                </CardTitle>
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <DollarSign className={balance.netBalance >= 0 ? "text-green-600 h-4 w-4 " : "text-red-600   h-4 w-4 "} />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className={balance.netBalance >= 0 ? "text-green-600 text-2xl font-bold" : "text-red-600 text-2xl font-bold"}>${balance.netBalance}</div>
                <p className={balance.netBalance >= 0 ? "text-green-600 text-xs  mt-1" : "text-red-600   text-xs mt-1"}>net balance</p>
              </CardContent>
            </Card>
          </motion.div>
        </CardContent>
      </Card>

      {/* Recent Activity Section (Optional) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <Card className="border-rose-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-rose-500">
              Recent Activity
            </CardTitle>
          </CardHeader>

  {(activity || []).map((item, index) => (
          <CardContent>
            <div className="space-y-4">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-3 border-b border-rose-50"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</p>
                </div>
                <span className={`text-sm font-bold ${item.isPaidByMe ? 'text-green-600' : 'text-red-600'}`}>{item.isPaidByMe ? '+' : '-'}${Number(item.amount)}</span>
              </motion.div>
              
              
            </div>
          </CardContent>

 ))}
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
