import React, { useEffect, useState } from "react";
import { EventType } from "../utils/interfaces";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface props {
  event: EventType | null;
  setShowModal: (showModal: boolean) => any;
  showModal: boolean;
  setShowEdit: (showEdit: boolean) => any;
  showEdit: boolean;
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

const Event = ({
  event,
  setShowModal,
  showModal,
  showEdit,
  setShowEdit,
}: props) => {
  const [remainingTime, setRemainingTime] = useState<TimeRemaining | null>(
    null,
  );
  const [eventIsPast, setEventIsPast] = useState(false);

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
  });

  {
  }

  const handleEditEvent = (event: EventType) => {
    console.log(event);
    setShowModal(!showModal);
    setShowEdit(!showEdit);
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
          {`${remainingTime?.hours || ""}`} hours{" "}
          {`${remainingTime?.minutes || ""}`} minutes{" "}
          {`${remainingTime?.seconds || ""}`} seconds
        </p>
      )}
      <button
        className="btn"
        onClick={() => {
          if (event) return handleEditEvent(event);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default Event;
