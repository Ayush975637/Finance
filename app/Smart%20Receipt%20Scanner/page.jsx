"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ReceiptScannerPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">📸 Smart Receipt Scanner</h1>

      <Card>
        <CardHeader>
          <CardTitle>Upload Receipt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input type="file" accept="image/*,application/pdf" />
          <Button>Scan & Extract</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceiptScannerPage;