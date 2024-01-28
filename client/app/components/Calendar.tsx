"use client";
import { useContext, useState } from "react";
import { dateObject, generateCalendar } from "../utils/generateCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Event from "./Event";
import EventForm from "./EventForm";
import { EventType } from "../utils/interfaces";
import { EventsContext } from "../context/EventsContextProvider";
import Filter from "./Filter";
import ThemeController from "./ThemeController";

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
      <div className=" flex w-11/12 max-w-3xl flex-col gap-y-10  ">
        <section className="flex items-center justify-between">
          <div className="flex w-48 items-center justify-between ">
            <p className=" min-w-32 select-none text-base-content ">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </p>
            <div className="flex gap-3 ">
              <FontAwesomeIcon
                className="w-4 transform cursor-pointer text-base-content transition-all duration-300 hover:scale-110"
                onClick={handlePreviousMonth}
                icon={faArrowLeft}
              />
              <FontAwesomeIcon
                className="w-4 transform cursor-pointer text-base-content transition-all duration-300 hover:scale-110"
                onClick={handleNextMonth}
                icon={faArrowRight}
              />
            </div>
          </div>
          <p
            onClick={() => {
              setCurrentDate(new Date());
            }}
            className="btn btn-outline btn-primary btn-sm select-none "
          >
            {dateFormat.format(new Date())}
          </p>
        </section>
        <div className="flex items-center justify-between  ">
          <Filter />

          <ThemeController />
        </div>
        <ul className="w-100  grid select-none grid-cols-7 text-base-content ">
          {daysOfWeek.map((day) => (
            <li key={day}>{day}</li>
          ))}
        </ul>
        <ul className="w-100 grid grid-cols-7 gap-x-1">
          {daysArray.map((day) => (
            <li
              onClick={() => handleDateClick(day)}
              className={`${" h-28 select-none overflow-y-auto overflow-x-hidden border-t border-t-gray-400  font-bold text-base-content hover:bg-base-200 hover:shadow-md "} ${
                day.currentMonth ? "" : "bg-base font-light"
              } ${
                day.date.toLocaleDateString() ===
                new Date().toLocaleDateString()
                  ? "bg-base-300 text-error"
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

              <ul className="flex flex-col items-start gap-1 ">
                {events.map((event, index) => {
                  return new Date(event.startDate).toLocaleDateString() ===
                    day.date.toLocaleDateString() ? (
                    <li
                      className="btn btn-accent btn-sm text-xs "
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
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
