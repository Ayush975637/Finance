"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const dummyBudget = {
  totalBudget: 30000,
  spent: 18450,
  savingsGoal: 5000,
  plannedExpenses: [
    { name: "Rent", amount: 10000 },
    { name: "Groceries", amount: 3500 },
    { name: "Transport", amount: 2000 },
    { name: "Subscriptions", amount: 1200 },
    { name: "Dining", amount: 1750 },
  ],
};

const chartData = dummyBudget.plannedExpenses.map((item) => ({
  name: item.name,
  Budgeted: item.amount,
  Actual: item.amount * (0.9 + Math.random() * 0.3), // Simulated overspend/underspend
}));

export default function BudgetPage() {
  const spentPercent = (dummyBudget.spent / dummyBudget.totalBudget) * 100;
  const savingsPercent = ((dummyBudget.totalBudget - dummyBudget.spent) / dummyBudget.savingsGoal) * 100;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">📘 Budget & Planning</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Budget</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-semibold text-green-600">₹{dummyBudget.totalBudget}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Spent So Far</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-red-600">₹{dummyBudget.spent}</p>
            <Progress value={spentPercent} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Savings Target</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-blue-600">₹{dummyBudget.savingsGoal}</p>
            <Progress value={Math.min(savingsPercent, 100)} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>📊 Budget vs Actual Spending</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Budgeted" fill="#8884d8" />
              <Bar dataKey="Actual" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>📝 Planned Expenses</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {dummyBudget.plannedExpenses.map((item, index) => (
              <li key={index} className="flex justify-between border-b pb-2">
                <span>{item.name}</span>
                <span className="font-semibold">₹{item.amount}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-amber-50">
        <CardHeader><CardTitle>⚠️ Budget Warning</CardTitle></CardHeader>
        <CardContent>
          {spentPercent > 90 ? (
            <p className="text-red-600">You’ve spent over 90% of your monthly budget. Consider reducing discretionary expenses.</p>
          ) : (
            <p className="text-green-700">You're within your budget. Keep it up! 🎉</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="default">➕ Add New Budget</Button>
      </div>
    </div>
  );
}
