"use client";
import { useContext, useState } from "react";
import { dateObject, generateCalendar } from "../utils/generateCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Event from "./Event";
import EventForm from "./EventForm";
import { EventType } from "../utils/interfaces";
import { EventsContext } from "../context/EventsContextProvider";
import Filter from "./Filter";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalDate, setModalDate] = useState(new Date());

  const {
    events,
    setShowForm,
    setShowEvent,
    setEvent,
    showForm,
    showEvent,
    showEdit,
    event,
    setShowEdit,
  } = useContext(EventsContext);

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

  dateFormat.format(new Date());

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

        <Filter />
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
              } ${
                //This part is because my love's birthday is 13th of August and she loves yellow!
                day.date.getMonth() === 7 && day.date.getDate() === 13
                  ? "bg-yellow-300"
                  : ""
              }`}
              key={day.date.toLocaleDateString()}
            >
              {day.date.getDate()}

              <ul>
                {events.map((event, index) => {
                  return new Date(event.startDate).toLocaleDateString() ===
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
          <EventForm date={modalDate} />
        </Modal>
      )}
      {showEvent && (
        <Modal setShowModal={setShowEvent} showModal={showEvent}>
          <Event event={event} />
        </Modal>
      )}
      {showEdit && (
        <Modal setShowModal={setShowEdit} showModal={showEdit}>
          <EventForm date={modalDate} event={event} />
        </Modal>
      )}
    </>
  );
};

export default Calendar;
