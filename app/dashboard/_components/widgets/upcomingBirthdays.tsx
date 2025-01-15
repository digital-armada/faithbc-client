"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import WidgetHeadings from "../WidgetHeadings";
import { contactsService } from "@/components/features/contacts/contacts-service";
import { useSession } from "next-auth/react";

function BirthdayList({ currentMonth }: { currentMonth: number }) {
  const session = useSession();

  const { data: users, isLoading } = useQuery({
    queryKey: ["birthdays", currentMonth],
    queryFn: async () =>
      await contactsService.getUsers({ currentMonth, session }),
  });

  if (isLoading) {
    return <p className="text-center">Loading birthdays...</p>;
  }

  if (!users?.data?.length) {
    return (
      <p className="text-center text-muted-foreground">
        No birthdays this month.
      </p>
    );
  }

  return (
    <ul className="space-y-2 divide-y-[.5px] divide-gray-200">
      {users?.data.map((user) => (
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

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex w-full flex-col items-center justify-between space-y-0 pb-2 sm:flex-row lg:flex-col xl:flex-row">
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
            {format(new Date(0, currentMonth), "MMMM")}
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
        <BirthdayList currentMonth={currentMonth} />
      </CardContent>
    </Card>
  );
}
