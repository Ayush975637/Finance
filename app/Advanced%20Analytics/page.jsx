"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AdvancedAnalyticsPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">📈 Advanced Analytics</h1>

      <Card>
        <CardHeader>
          <CardTitle>Spending Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Coming soon: Weekly/Monthly patterns with charts.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Deep-Dive</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">AI breakdown of spending habits.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalyticsPage;