"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { ChevronLeft, ChevronRight, Gift } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import WidgetHeadings from "../WidgetHeadings";

function BirthdayList({ currentMonth }: { currentMonth: number }) {
  const { data: users } = useSuspenseQuery({
    queryKey: ["birthdays", currentMonth],
    queryFn: async () => {
      const response = await fetch(
        "https://api.faithbc.org.au/api/users?populate=*",
      );
      return response.json();
    },
  });

  const filteredBirthdays = users
    ?.filter((user) => new Date(user.dateOfBirth).getMonth() === currentMonth)
    .sort((a, b) => {
      const dayA = new Date(a.dateOfBirth).getDate();
      const dayB = new Date(b.dateOfBirth).getDate();
      return dayA - dayB;
    });

  if (!filteredBirthdays?.length) {
    return (
      <p className="text-center text-muted-foreground">
        No birthdays this month.
      </p>
    );
  }

  return (
    <ul className="space-y-2 divide-y-[.5px] divide-gray-200">
      {filteredBirthdays.map((user) => (
        <li key={user.id} className="flex items-center">
          <div className="mt-2 flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {`${user.firstName} ${user.lastName}`}
            </p>
            <p className="text-[11px] font-light text-muted-foreground">
              {format(new Date(user.dateOfBirth), "MMMM d")}
            </p>
          </div>
          <Gift className="h-5 w-5 text-muted-foreground" />
        </li>
      ))}
    </ul>
  );
}

export default function BirthdayWidget({ className }: { className?: string }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex w-full flex-row items-center justify-between space-y-0 pb-2 lg:flex-row">
        <WidgetHeadings heading="Birthdays" />

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth((prev) => (prev - 1 + 12) % 12)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {monthNames[currentMonth]}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth((prev) => (prev + 1) % 12)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={<p className="text-center">Loading birthdays...</p>}
        >
          <BirthdayList currentMonth={currentMonth} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
