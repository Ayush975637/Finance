"use client"

import React,{useState,PureComponent } from "react";
import { generateMonthlyReport} from "@/actions/monthlyReport"
import RuppeLoader from "@/components/loader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { PieChart, Pie, Sector, Cell } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const datax = [
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

const InsightPage = () => {
const [loading,setLoading]=useState(false);
const[advice,setAdvice]=useState("");

const handleGenerate=async()=>{

    setLoading(true);
    const {aiResponse}=await generateMonthlyReport();
    setAdvice(aiResponse);
    setLoading(false);
}




  return (
    <div className='mt-23 max-w-6xl mx-auto p-4 space-y-6'>
            <h1 className="text-3xl font-bold text-center">📊 Monthly Insights & Suggestions</h1>
         <div className="p-4 bg-white border rounded shadow">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">₹7473</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Category</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">hhhhdkjgjf</p>
            <p className="text-xl font-semibold text-rose-600">$8687</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recurring Txns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-blue-600">8</p>
          </CardContent>
        </Card>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
          <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Over Time</CardTitle>
          </CardHeader>
          <CardContent>
             <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={datax}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
 <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle>💡 AI Financial Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center space-x-2 text-yellow-600">
              <RuppeLoader className="animate-spin" />
              <span>Analyzing your data...</span>
            </div>
          ) : (
            <p className="text-gray-800 whitespace-pre-line text-sm leading-relaxed">
              {advice}
            </p>
          )}
        </CardContent>
      </Card>

<Card className="mt-4">
     <CardHeader>
          <CardTitle className="text-2xl font-bold mb-2 text-center mt-10 text-fuchsia-500 ">AI Monthly Analysis</CardTitle>
        </CardHeader>

<CardContent>
      <Button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-5 ml-1"
        onClick={handleGenerate}
      >{loading?"Analyzing...":"Generate Report"}
        
      </Button>


      {(!advice&&loading)? <div><RuppeLoader></RuppeLoader> </div>  :
        <div className="mt-4 p-2 bg-gray-50 border rounded text-sm whitespace-pre-wrap">
          {advice}

         
        </div>
      }
      </CardContent>
      </Card>
    </div>



    </div>
  )
}

export default InsightPage;
