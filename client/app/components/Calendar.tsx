"use client";
import { useState } from "react";
import { generateCalendar } from "../utils/generateCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek: string[] = [
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
    "Sun",
  ];

  const dateFormat = new Intl.DateTimeFormat("en-au", {
    dateStyle: "full",
  });

  const daysArray = generateCalendar(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      )
    );
  };
  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      )
    );
  };
  return (
    <div className=" w-3/5 flex flex-col gap-y-10">
      <section className="flex justify-between items-center">
        <div className="flex justify-between items-center w-48 ">
          <p className=" min-w-32 select-none">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="flex gap-3 ">
            <FontAwesomeIcon
              className="transform hover:scale-110 cursor-pointer w-4 transition-all duration-300"
              onClick={handlePreviousMonth}
              icon={faArrowLeft}
            />
            <FontAwesomeIcon
              className="transform hover:scale-110 cursor-pointer w-4 transition-all duration-300"
              onClick={handleNextMonth}
              icon={faArrowRight}
            />
          </div>
        </div>
        <p
          onClick={() => {
            setCurrentDate(new Date());
          }}
          className="text-blue-500 cursor-pointer hover:text-gray-500 select-none"
        >
          {dateFormat.format(new Date())}
        </p>
      </section>

      <ul className="w-100  grid grid-cols-7 select-none">
        {daysOfWeek.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
      <ul className="w-100 grid grid-cols-7 ">
        {daysArray.map((day) => (
          <li
            onClick={() => console.log(day.date)}
            className={`${"border-t border-t-gray-400 h-28 hover:bg-red-100 select-none"} ${
              day.currentMonth ? "" : "text-gray-400"
            } ${
              day.date.toLocaleDateString() === new Date().toLocaleDateString()
                ? "text-red-600 bg-blue-100"
                : ""
            }`}
            key={day.date.toLocaleDateString()}
          >
            {day.date.getDate()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
