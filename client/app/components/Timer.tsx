import React, { useEffect, useState } from "react";
import { EventType } from "../utils/interfaces";
import { TimeRemaining } from "./Event";

interface props {
  remainingTime: number;
  event: EventType | null;
}

const Timer = ({ remainingTime, event }: props) => {
  const [initial, setInitial] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const currentDate = new Date().getTime();
    const targetDate = new Date(event.startDate).getTime();
    const time = Math.ceil((targetDate - currentDate) / 1000);
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600) % 24;
    const days = Math.floor(time / 86400);
    setInitial({
      days,
      hours,
      minutes,
      seconds,
    });
  }, []);

  useEffect(() => {
    let previousTimeBetweenDates;

    const intervalId = setInterval(() => {
      const currentDate = new Date().getTime();
      const targetDate = new Date(event.startDate).getTime();
      const timeBetweenDates = Math.ceil((targetDate - currentDate) / 1000);

      flipAllCards(timeBetweenDates);

      previousTimeBetweenDates = timeBetweenDates;
    }, 250);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const flipAllCards = (time: number) => {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600) % 24;
    const days = Math.floor(time / 86400);

    flip(document.querySelector("[data-days-tens]"), Math.floor(days / 10));
    flip(document.querySelector("[data-days-ones]"), days % 10);
    flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
    flip(document.querySelector("[data-hours-ones]"), hours % 10);
    flip(
      document.querySelector("[data-minutes-tens]"),
      Math.floor(minutes / 10),
    );
    flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
    flip(
      document.querySelector("[data-seconds-tens]"),
      Math.floor(seconds / 10),
    );
    flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
    return { seconds, minutes, hours, days };
  };

  const flip = (flipCard: HTMLElement | null, newNumber: number) => {
    if (!flipCard) {
      console.error("flipCard is null");
      return;
    }
    const topHalf = flipCard.querySelector(".top");

    const startNumber = parseInt(topHalf.textContent);
    if (newNumber === startNumber) return;

    const bottomHalf = flipCard.querySelector(".bottom");
    const topFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    const bottomFlip = document.createElement("div");
    bottomFlip.classList.add("bottom-flip");

    top.textContent = startNumber;
    bottomHalf.textContent = startNumber;
    topFlip.textContent = startNumber;
    bottomFlip.textContent = newNumber;

    topFlip.addEventListener("animationstart", (e) => {
      topHalf.textContent = newNumber;
    });
    topFlip.addEventListener("animationend", (e) => {
      topFlip.remove();
    });
    bottomFlip.addEventListener("animationend", (e) => {
      bottomHalf.textContent = newNumber;
      bottomFlip.remove();
    });
    flipCard.append(topFlip, bottomFlip);
  };

  return (
    <div className="container">
      <div className="container-segment">
        <div className="segment-title text-red-600">Days</div>
        <div className="segment">
          <div className="flip-card" data-days-tens>
            <div className="top">{Math.floor(initial.days / 10)}</div>
            <div className="bottom">{Math.floor(initial.days / 10)}</div>
          </div>
          <div className="flip-card" data-days-ones>
            <div className="top">{initial.days % 10}</div>
            <div className="bottom">{initial.days % 10}</div>
          </div>
        </div>
      </div>

      <div className="container-segment">
        <div className="segment-title text-blue-600">Hours</div>
        <div className="segment">
          <div className="flip-card" data-hours-tens>
            <div className="top">{Math.floor(initial.hours / 10)}</div>
            <div className="bottom">{Math.floor(initial.hours / 10)}</div>
          </div>
          <div className="flip-card" data-hours-ones>
            <div className="top">{initial.hours % 10}</div>
            <div className="bottom">{initial.hours % 10}</div>
          </div>
        </div>
      </div>
      <div className="container-segment">
        <div className="segment-title text-yellow-600">Minutes</div>
        <div className="segment">
          <div className="flip-card" data-minutes-tens>
            <div className="top">{Math.floor(initial.minutes / 10)}</div>
            <div className="bottom">{Math.floor(initial.minutes / 10)}</div>
          </div>
          <div className="flip-card" data-minutes-ones>
            <div className="top">{initial.minutes % 10}</div>
            <div className="bottom">{initial.minutes % 10}</div>
          </div>
        </div>
      </div>
      <div className="container-segment">
        <div className="segment-title text-green-600">Seconds</div>
        <div className="segment">
          <div className="flip-card" data-seconds-tens>
            <div className="top">{Math.floor(initial.seconds / 10)}</div>
            <div className="bottom">{Math.floor(initial.seconds / 10)}</div>
          </div>
          <div className="flip-card" data-seconds-ones>
            <div className="top">{initial.seconds % 10}</div>
            <div className="bottom">{initial.seconds % 10}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
