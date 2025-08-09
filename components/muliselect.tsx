// components/MultiSelect.tsx
"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  setSelected: (value: string[] | ((prev: string[]) => string[])) => void;
}

export function MultiSelect({ options, selected, setSelected }: MultiSelectProps) {
  const toggleOption = (value: string) => {
    setSelected((prev: string[]) =>
      prev.includes(value) ? prev.filter((v: string) => v !== value) : [...prev, value]
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selected.length > 0 ? `${selected.length} selected` : "Select Members"}
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        <ScrollArea className="h-48">
          {options.map((opt: Option) => (
            <div
              key={opt.value}
              onClick={() => toggleOption(opt.value)}
              className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded"
            >
              <Checkbox checked={selected.includes(opt.value)} />
              <span>{opt.label}</span>
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
