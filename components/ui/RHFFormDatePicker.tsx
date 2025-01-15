"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function RHFFormDatePicker({
  label,
  name,
  setValue,
  defaultValue,
  className,
}) {
  return (
    <Popover>
      <div>{label}</div>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `${className} justify-start text-left font-normal`,
            !defaultValue && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {defaultValue ? (
            format(defaultValue, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={defaultValue}
          onSelect={(date) => {
            const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
            setValue(name, formattedDate);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
