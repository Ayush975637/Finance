"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MultiCurrencyPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">🌍 Multi-Currency Support</h1>

      <Card>
        <CardHeader>
          <CardTitle>Convert Currency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Amount" />
          <Input placeholder="From (e.g. USD)" />
          <Input placeholder="To (e.g. INR)" />
          <Button>Convert</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiCurrencyPage;