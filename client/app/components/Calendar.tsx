"use client";
import { useState } from "react";
import { generateCalendar } from "../utils/generateCalendar";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 11, 11));

  const daysOfWeek: string[] = [
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
    "Sun",
  ];
  console.log(generateCalendar());
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
      {/* <ul className="w-100  grid grid-cols-7 gap-y-28">
        {daysArray.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Calendar;
