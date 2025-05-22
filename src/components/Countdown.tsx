// components/Countdown.tsx
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeStyle = "flex flex-col items-center mx-2";
  const timeStyleWithBorder = "flex flex-col items-center px-3 border-r-3";
  const numberStyle = "text-6xl sm:text-7xl";
  const labelStyle = "text-base sm:text-lg tracking-wide uppercase";

  return (
    <div className="flex justify-center text-white">
      <div className={timeStyleWithBorder}>
        <span className={numberStyle}>{timeLeft.days}</span>
        <span className={labelStyle}>Days</span>
      </div>
      <div className={timeStyleWithBorder}>
        <span className={numberStyle}>{timeLeft.hours}</span>
        <span className={labelStyle}>Hours</span>
      </div>
      <div className={timeStyleWithBorder}>
        <span className={numberStyle}>{timeLeft.minutes}</span>
        <span className={labelStyle}>Min.</span>
      </div>
      <div className={timeStyle}>
        <span className={numberStyle}>{timeLeft.seconds}</span>
        <span className={labelStyle}>Sec.</span>
      </div>
    </div>
  );
};

export default Countdown;
