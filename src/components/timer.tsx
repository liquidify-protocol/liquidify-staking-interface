import React, { useEffect, useState } from "react";

export const Timer = () => {
  const [countdownDate, setCountdownDate] = useState(
    new Date("2023-05-17T21:00:00-04:00").getTime()
  );
  const [state, setState] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, []);
  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      const distanceToDate = countdownDate - currentTime;

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      let daysStr = `${days}`;
      let hoursStr = `${hours}`;
      let minutesStr = `${minutes}`;
      let secondsStr = `${seconds}`;
      if (numbersToAddZeroTo.includes(hours)) {
        hoursStr = `0${hours}`;
      }
      if (numbersToAddZeroTo.includes(minutes)) {
        minutesStr = `0${minutes}`;
      }
      if (numbersToAddZeroTo.includes(seconds)) {
        secondsStr = `0${seconds}`;
      }

      setState({
        days: daysStr,
        hours: hoursStr,
        minutes: minutesStr,
        seconds: secondsStr,
      });
    }
  };
  return (
    <div className="flex flex-col gap-50 px-[8vw] pt-10 md:pt-10 lg:pt-10 pb-10">
      <div className="countdown-wrapper">
        <div className="time-section">
          <div className="time">{state.days || "0"}</div>
          <small className="time-text">Days</small>
        </div>
        <div className="time-section">
          <div className="time">:</div>
        </div>
        <div className="time-section w-90">
          <div className="time">{state.hours || "00"}</div>
          <small className="time-text">Hours</small>
        </div>
        <div className="time-section">
          <div className="time">:</div>
        </div>
        <div className="time-section w-90">
          <div className="time">{state.minutes || "00"}</div>
          <small className="time-text">Minutes</small>
        </div>
        <div className="time-section">
          <div className="time">:</div>
        </div>
        <div className="time-section w-90">
          <div className="time">{state.seconds || "00"}</div>
          <small className="time-text">Seconds</small>
        </div>
      </div>
    </div>
  );
};
