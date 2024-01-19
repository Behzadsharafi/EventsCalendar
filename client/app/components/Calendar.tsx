"use client";
import { useEffect, useState } from "react";
import { dateObject, generateCalendar } from "../utils/generateCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { dummyEvents } from "../data/events";
import Event, { EventType } from "./Event";
import Day from "./Day";
import EventForm from "./EventForm";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalDate, setModalDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [events, setEvents] = useState<EventType[]>([]);
  const [event, setEvent] = useState<EventType | null>(null);

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
    setShowForm(true);
  };
  const handleEventClick = (event: EventType) => {
    setShowEvent(true);
    setEvent(event);
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
              className={`${"h-28 select-none border-t border-t-gray-400 hover:bg-red-100 hover:shadow-md "} ${
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
                    <li
                      className="z-30 w-11/12 transform cursor-pointer rounded-sm  bg-red-200 px-1 transition-all duration-300 hover:scale-95 hover:bg-red-300"
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation(); // Stop propagation here
                        handleEventClick(event);
                      }}
                    >
                      {event.name}
                    </li>
                  ) : null;
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {showForm && (
        <Modal setShowModal={setShowForm} showModal={showForm}>
          <EventForm />
        </Modal>
      )}
      {showEvent && (
        <Modal setShowModal={setShowEvent} showModal={showEvent}>
          <Event event={event} />
        </Modal>
      )}
    </>
  );
};

export default Calendar;
