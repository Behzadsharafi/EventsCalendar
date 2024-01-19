import React, { useEffect, useState } from "react";

export interface EventType {
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  label: string;
}

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

  const updateRemainingTime = () => {
    if (event) {
      const currentDate = new Date();
      if (event.startDate > currentDate) {
        const newRemainingTime = timeUntil(event.startDate);
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
    </div>
  );
};

export default Event;
