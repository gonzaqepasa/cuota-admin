"use client";
import { useEffect, useState } from "react";

interface Props {
  paymentDate: Date;
  expirationDate: Date;
  bg?: Boolean;
  size?: number;
}

const CountdownTimer: React.FC<Props> = ({
  paymentDate,
  expirationDate,
  bg,
  size,
}) => {
  const calculateTimeRemaining = () => {
    const totalMilliseconds = expirationDate.getTime() - new Date().getTime();
    if (totalMilliseconds <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const totalSeconds = Math.floor(totalMilliseconds / 1000);

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [expirationDate]);

  const formatTime = (value: any) => {
    return value < 10 ? `0${value}` : value;
  };

  const remainingTimeStyle =
    timeRemaining.days === 0 &&
    timeRemaining.hours === 0 &&
    timeRemaining.minutes === 0 &&
    timeRemaining.seconds === 0
      ? { color: "red" }
      : { color: "green" };

  return (
    <div className={`${bg && "bg-primary-300 rounded px-1"}`}>
      <p
        className={`p-1`}
        style={{
          ...remainingTimeStyle,
          fontSize: `${size ? size + "rem" : "1rem"}`,
        }}
      >{`${formatTime(timeRemaining.days)} Días, ${formatTime(
        timeRemaining.hours
      )}:${formatTime(timeRemaining.minutes)}:${formatTime(
        timeRemaining.seconds
      )}`}</p>
    </div>
  );
};

export default CountdownTimer;
