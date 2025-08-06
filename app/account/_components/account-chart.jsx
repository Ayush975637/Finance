
"use client";


import { format } from 'date-fns';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React, { PureComponent, use } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMemo, useState } from 'react';
import { startOfDay, subDays } from 'date-fns';
import { date } from 'zod/v4-mini';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const DATE_RANGES={


    "7D":{label:"Last 7 Days",days:7},
    "1M":{label:"Last 30 Days",days:30},
    "3M":{label:"Last 90 Days",days:90},
    "6M":{label:"Last 180 Days",days:180},
    ALL:{label:"All Time",days:null}
}




const AccountChart = ({transactions}) => {
    const [dateRange, setDateRange] = useState("1M");

const filteredData = useMemo(() => {
const range = DATE_RANGES[dateRange];

const now=new Date();
const startDate=range.days?startOfDay(subDays(now,range.days)):startOfDay(new Date(0)); // If no range, start from epoch
const endDate=startOfDay(now);
const filtered=transactions.filter((t)=>new Date(t.date)>=startDate&&new Date(t.date)<=endDate);
const grouped=filtered.reduce((acc, transaction) => {
    const date = format(new Date(transaction.date),"MMM dd")
 if (!acc[date]) {
    acc[date] = { date,  income: 0, expense: 0 };
 } if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
    } else if (transaction.type === "EXPENSE") {
        acc[date].expense += transaction.amount;
    }


    return acc;
 }, {});

   

 return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date))


}, [transactions, dateRange]);

const totals=useMemo(() => {
    return filteredData.reduce((acc, transaction) => {
        acc.income += transaction.income;
        acc.expense += transaction.expense;
        return acc;
    }, { income: 0, expense: 0 });
}, [filteredData]);

console.log(filteredData);
    return(
   <Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
    <CardTitle>Transaction Overview</CardTitle>
   <Select defaultValue={dateRange} onValueChange={setDateRange} className="w-[180px]">
  <SelectTrigger className="w-[140px]">
    <SelectValue placeholder="Select Date Range" />
  </SelectTrigger>
  <SelectContent>
    {Object.entries(DATE_RANGES).map(([key, { label }]) => {
        return (
      <SelectItem key={key} value={key}>
        {label}
      </SelectItem>
        );
    })}
  </SelectContent>
</Select>
  </CardHeader>
  <CardContent>
    <div className='flex justify-around mb-6 text-sm'>
        <div className="text-center">
            <p className='text-muted-foreground'>Total Income</p>
            <p className=' text-lg font-bold text-green-500'>${totals.income.toFixed(2)}</p>
        </div>
        <div className="text-center">
            <p className='text-muted-foreground'>Total Expenses</p>
            <p className=' text-lg font-bold text-red-500'>${totals.expense.toFixed(2)}</p>
        </div>
        <div className="text-center">
            <p className='text-muted-foreground'>Net</p>
            <p className={`text-lg font-bold ${totals.income - totals.expense < 0 ? 'text-red-500' : 'text-green-500'}`}>${(totals.income-totals.expense).toFixed(2)}</p>
        </div>
    </div>
    
    
    
    
    
    
    


    <div className="h-[330px]">



    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={filteredData}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3"  vertical={false}/>
          <XAxis dataKey="date" />
          <YAxis fontSize={12}
          tickFormatter={(value) => `$${value}`}
          tickLine={false}
          axisLine={false}
          
          
          />
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
          <Bar dataKey="income" name="Income" fill="#00FF00
" radius={[4,4,0,0]} activeBar={<Rectangle fill="pink" stroke="green" />} />
          <Bar dataKey="expense" name="Expense" fill="#FF0000
" radius={[4,4,0,0]} activeBar={<Rectangle fill="gold" stroke="red" />} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    
  </CardContent>
  
</Card>
        
    
  )
}

export default AccountChart
