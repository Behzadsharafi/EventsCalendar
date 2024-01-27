import React, { useContext, useEffect, useState } from "react";
import { EventType } from "../utils/interfaces";
import { EventsContext } from "../context/EventsContextProvider";
import { deleteEventById, getAllEvents } from "../services/event-service";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface props {
  event: EventType | null;
}

const timeUntil = (targetDate: Date): TimeRemaining => {
  const currentDate = new Date();
  const differenceInMillis = targetDate.getTime() - currentDate.getTime();
  const days = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (differenceInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor(
    (differenceInMillis % (1000 * 60 * 60)) / (1000 * 60),
  );
  const seconds = Math.floor((differenceInMillis % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const Event = ({ event }: props) => {
  const [remainingTime, setRemainingTime] = useState<TimeRemaining | null>(
    null,
  );
  const [eventIsPast, setEventIsPast] = useState(false);
  const { setShowEvent, setShowEdit, showEvent, showEdit, setEvents } =
    useContext(EventsContext);

  const updateRemainingTime = () => {
    if (event) {
      const currentDate = new Date();
      if (new Date(event.startDate) > currentDate) {
        const newRemainingTime = timeUntil(new Date(event.startDate));
        setRemainingTime(newRemainingTime);
        setEventIsPast(false);
      } else {
        setEventIsPast(true);
      }
    }
  };

  useEffect(() => {
    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(intervalId);
  }, [event]);

  const dateFormat = new Intl.DateTimeFormat("en-au", {
    dateStyle: "medium",
    timeStyle: "medium",
  });

  const handleEditEvent = (event: EventType) => {
    setShowEvent(!showEvent);
    setShowEdit(!showEdit);
  };
  const handleDeleteEvent = async (event: EventType) => {
    await deleteEventById(event.id);

    await getAllEvents().then((events) => {
      setEvents(events);
    });
    setShowEvent(false);
  };

  return (
    <div>
      <h2>{event?.name}</h2>
      <p>{event ? dateFormat.format(new Date(event.startDate)) : ""}</p>
      <p>{event ? dateFormat.format(new Date(event.endDate)) : ""}</p>
      <p>{event?.location}</p>
      <p>{event?.label}</p>
      {eventIsPast ? (
        <p>The event has already occurred.</p>
      ) : (
        <p>
          Event starts in{" "}
          {remainingTime?.days !== undefined ? remainingTime.days : "0"} days{" "}
          {`${remainingTime?.hours || "0"}`} hours{" "}
          {`${remainingTime?.minutes || "0"}`} minutes{" "}
          {`${remainingTime?.seconds || "0"}`} seconds
        </p>
      )}
      <div>
        <button
          className="btn"
          onClick={() => {
            if (event) return handleEditEvent(event);
          }}
        >
          Edit
        </button>
        <button
          className="btn"
          onClick={() => {
            if (event) return handleDeleteEvent(event);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Event;
