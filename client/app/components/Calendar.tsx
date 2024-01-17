"use client";
import { useEffect, useState } from "react";
import { dateObject, generateCalendar } from "../utils/generateCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { dummyEvents } from "../data/events";
import { event } from "./../data/events";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalDate, setModalDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState<event[]>([]);

  useEffect(() => {
    setEvents(dummyEvents);
  }, []);

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
    currentDate.getFullYear(),
  );

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate(),
      ),
    );
  };
  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate(),
      ),
    );
  };

  const handleDateClick = (day: dateObject) => {
    setModalDate(day.date);
    setShowModal(true);
  };
  return (
    <>
      <div className=" flex w-3/5 flex-col gap-y-10  ">
        <section className="flex items-center justify-between">
          <div className="flex w-48 items-center justify-between ">
            <p className=" min-w-32 select-none">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </p>
            <div className="flex gap-3 ">
              <FontAwesomeIcon
                className="w-4 transform cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={handlePreviousMonth}
                icon={faArrowLeft}
              />
              <FontAwesomeIcon
                className="w-4 transform cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={handleNextMonth}
                icon={faArrowRight}
              />
            </div>
          </div>
          <p
            onClick={() => {
              setCurrentDate(new Date());
            }}
            className="cursor-pointer select-none text-blue-500 hover:text-gray-500"
          >
            {dateFormat.format(new Date())}
          </p>
        </section>

        <ul className="w-100  grid select-none grid-cols-7">
          {daysOfWeek.map((day) => (
            <li key={day}>{day}</li>
          ))}
        </ul>
        <ul className="w-100 grid grid-cols-7 ">
          {daysArray.map((day) => (
            <li
              onClick={() => handleDateClick(day)}
              className={`${"h-28 select-none border-t border-t-gray-400 hover:bg-red-100"} ${
                day.currentMonth ? "" : "text-gray-400"
              } ${
                day.date.toLocaleDateString() ===
                new Date().toLocaleDateString()
                  ? "bg-blue-100 text-red-600"
                  : ""
              }`}
              key={day.date.toLocaleDateString()}
            >
              {day.date.getDate()}
              <ul>
                {events.map((event, index) => {
                  return event.startDate.toLocaleDateString() ===
                    day.date.toLocaleDateString() ? (
                    <li key={index}>{event.name}</li>
                  ) : null;
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          date={modalDate}
        />
      )}
    </>
  );
};

export default Calendar;
