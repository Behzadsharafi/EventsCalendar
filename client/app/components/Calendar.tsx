"use client";
import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 11, 25));

  const daysInCurrentMonth = (date: Date): number => {
    // Day 0 is treated as the last day of previous month
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  const daysInPreviousMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  };
  const firstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysArray: number[] = [];

  for (let i = 1; i <= daysInCurrentMonth(currentDate); i++) {
    daysArray.push(i);
  }
  for (let i = 0; i < firstDayOfMonth(currentDate) - 1; i++) {
    daysArray.unshift(daysInPreviousMonth(currentDate) - i);
  }

  const nextMonthDays = 42 - daysArray.length;

  for (let i = 1; i <= nextMonthDays; i++) {
    daysArray.push(i);
  }
  const daysOfWeek: string[] = [
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
    "Sun",
  ];

  return (
    <div className="bg-red-400 w-3/5 flex flex-col gap-y-10">
      <p>
        {currentDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </p>
      <ul className="w-100  grid grid-cols-7">
        {daysOfWeek.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
      <ul className="w-100  grid grid-cols-7 gap-y-28">
        {daysArray.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
