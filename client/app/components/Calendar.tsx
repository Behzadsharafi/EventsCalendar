"use client";
import { useState } from "react";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInMonth = (date: Date): number => {
    // Day 0 is treated as the last day of previous month
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  const firstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  console.log(daysInMonth(new Date()));

  const currentMonthArray: number[] = [];

  for (let i = 1; i <= daysInMonth(new Date()); i++) {
    currentMonthArray.push(i);
  }

  return (
    <div>
      <p>
        {currentMonth.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </p>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default Calendar;
