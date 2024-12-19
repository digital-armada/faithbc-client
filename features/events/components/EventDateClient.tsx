"use client";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
export default function EventDateClient({ startDate, endDate }) {
  const [date, setDate] = useState("");
  useEffect(() => {
    const date = new Date(startDate);
    setDate(date.toLocaleString());
  }, [startDate]);

  // console.log("startDate", startDate);
  // const startDateObj = DateTime.fromISO(startDate, { zone: "utc" })
  //   .setZone("Australia/Sydney")
  //   .toFormat("EEE, d MMM, h:mm a");
  return <div>{date}</div>;
}
