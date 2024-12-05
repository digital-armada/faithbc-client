"use client";

import * as React from "react";
import { format, parseISO, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormDateTimePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  defaultValue?: string;
}

export function FormDateTimePicker({
  label,
  name,
  defaultValue,
  className,
  ...props
}: FormDateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (defaultValue) {
      const parsedDate = parseISO(defaultValue);
      return isValid(parsedDate) ? parsedDate : undefined;
    }
    return undefined;
  });

  const [time, setTime] = React.useState(() => {
    if (defaultValue) {
      const parsedDate = parseISO(defaultValue);
      return isValid(parsedDate) ? format(parsedDate, "HH:mm") : "";
    }
    return "";
  });

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate && time) {
      const [hours, minutes] = time.split(":");
      const dateTime = new Date(newDate);
      dateTime.setHours(parseInt(hours), parseInt(minutes));
      props.onChange?.(dateTime.toISOString() as any);
    } else {
      props.onChange?.(newDate?.toISOString() as any);
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setTime(newTime);
    if (date && newTime) {
      const [hours, minutes] = newTime.split(":");
      const dateTime = new Date(date);
      dateTime.setHours(parseInt(hours), parseInt(minutes));
      props.onChange?.(dateTime.toISOString() as any);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          value={time}
          onChange={handleTimeChange}
          className="w-[120px]"
        />
      </div>
      <input
        type="hidden"
        name={name}
        value={
          date && time
            ? format(
                new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                  ...time.split(":").map(Number),
                ),
                "yyyy-MM-dd'T'HH:mm",
              )
            : ""
        }
        {...props}
      />
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { format, parseISO, isValid } from "date-fns";
//
// const FormDateTimePicker = ({
//   label,
//   name,
//   defaultValue,
//   className = "",
//   ...props
// }) => {
//   const [value, setValue] = useState(() => {
//     if (defaultValue) {
//       const parsedDate = parseISO(defaultValue);
//       return isValid(parsedDate)
//         ? format(parsedDate, "yyyy-MM-dd'T'HH:mm")
//         : "";
//     }
//     return "";
//   });
//
//   useEffect(() => {
//     if (props.onChange) props.onChange(value);
//   }, [value, props, props.onChange]);
//
//   const handleChange = (event) => {
//     let newValue = event.target.value;
//     // Check if the time part is empty and set it to midnight if it is
//     if (!newValue.includes("T")) {
//       newValue = `${newValue}T00:00`;
//     }
//     setValue(newValue);
//   };
//
//   return (
//     <div className="sm:col-span-3">
//       <label className="block text-sm font-medium leading-6 text-gray-900">
//         {label}
//       </label>
//       <div className="mt-2">
//         <input
//           type="datetime-local"
//           name={name}
//           value={value}
//           className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
//           onChange={handleChange}
//           {...props}
//         />
//       </div>
//     </div>
//   );
// };
//
// export default FormDateTimePicker;
