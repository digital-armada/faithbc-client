"use client";

import * as React from "react";
import { DateTime } from "luxon";
import { CalendarIcon } from "lucide-react";

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
  const [dateTime, setDateTime] = React.useState<DateTime>(() => {
    if (defaultValue) {
      const dt = DateTime.fromISO(defaultValue, { zone: "utc" }).toLocal();
      return dt.isValid ? dt : DateTime.local();
    }
    return DateTime.local();
  });

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      const newDateTime = DateTime.fromJSDate(newDate).set({
        hour: dateTime.hour,
        minute: dateTime.minute,
      });
      setDateTime(newDateTime);
      props.onChange?.(newDateTime.toUTC().toISO() as any);
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = event.target.value.split(":").map(Number);
    const newDateTime = dateTime.set({ hour: hours, minute: minutes });
    setDateTime(newDateTime);
    props.onChange?.(newDateTime.toUTC().toISO() as any);
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
                !dateTime && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTime ? dateTime.toFormat("DDD") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateTime.toJSDate()}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          value={dateTime.toFormat("HH:mm")}
          onChange={handleTimeChange}
          className="w-[120px]"
        />
      </div>
      <input
        type="hidden"
        name={name}
        value={dateTime.toUTC().toISO()}
        {...props}
      />
    </div>
  );
}

// "use client";
//
// import * as React from "react";
// import { format, parseISO, isValid } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
//
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
//
// interface FormDateTimePickerProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   name: string;
//   defaultValue?: string;
// }
//
// export function FormDateTimePicker({
//   label,
//   name,
//   defaultValue,
//   className,
//   ...props
// }: FormDateTimePickerProps) {
//   const [date, setDate] = React.useState<Date | undefined>(() => {
//     if (defaultValue) {
//       const parsedDate = parseISO(defaultValue);
//       return isValid(parsedDate) ? parsedDate : undefined;
//     }
//     return undefined;
//   });
//
//   const [time, setTime] = React.useState(() => {
//     if (defaultValue) {
//       const parsedDate = parseISO(defaultValue);
//       return isValid(parsedDate) ? format(parsedDate, "HH:mm") : "";
//     }
//     return "";
//   });
//
//   const handleDateChange = (newDate: Date | undefined) => {
//     setDate(newDate);
//     if (newDate && time) {
//       const [hours, minutes] = time.split(":");
//       const dateTime = new Date(newDate);
//       dateTime.setHours(parseInt(hours), parseInt(minutes));
//       props.onChange?.(dateTime.toISOString() as any);
//     } else {
//       props.onChange?.(newDate?.toISOString() as any);
//     }
//   };
//
//   const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newTime = event.target.value;
//     setTime(newTime);
//     if (date && newTime) {
//       const [hours, minutes] = newTime.split(":");
//       const dateTime = new Date(date);
//       dateTime.setHours(parseInt(hours), parseInt(minutes));
//       props.onChange?.(dateTime.toISOString() as any);
//     }
//   };
//
//   return (
//     <div className="space-y-2">
//       <Label htmlFor={name}>{label}</Label>
//       <div className="flex space-x-2">
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               className={cn(
//                 "w-[240px] justify-start text-left font-normal",
//                 !date && "text-muted-foreground",
//               )}
//             >
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {date ? format(date, "PPP") : <span>Pick a date</span>}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0">
//             <Calendar
//               mode="single"
//               selected={date}
//               onSelect={handleDateChange}
//               initialFocus
//             />
//           </PopoverContent>
//         </Popover>
//         <Input
//           type="time"
//           value={time}
//           onChange={handleTimeChange}
//           className="w-[120px]"
//         />
//       </div>
//       <input
//         type="hidden"
//         name={name}
//         value={
//           date && time
//             ? format(
//                 new Date(
//                   date.getFullYear(),
//                   date.getMonth(),
//                   date.getDate(),
//                   ...time.split(":").map(Number),
//                 ),
//                 "yyyy-MM-dd'T'HH:mm",
//               )
//             : ""
//         }
//         {...props}
//       />
//     </div>
//   );
// }
