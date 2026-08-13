import type { FC } from 'react';
import { useState, useEffect } from 'react';
import './Countdown.css';

const getTargetDate = (): Date => {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, 8, 16, 19, 0, 0); // September 16 at 7:00 PM (19:00)
  if (now.getTime() > target.getTime()) {
    target = new Date(year + 1, 8, 16, 19, 0, 0);
  }
  return target;
};

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const calculateTimeLeft = (target: Date): TimeLeft => {
  const difference = target.getTime() - new Date().getTime();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
};

const Countdown: FC = () => {
  const [targetDate] = useState<Date>(() => getTargetDate());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const padZero = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="countdown-container">
      <div className="countdown-pre-title">Buy tickets for</div>
      <h2 className="countdown-title">
        <a 
          href="https://www.eventbrite.com/e/1997848905858?aff=oddtdtcreator" 
          target="_blank" 
          rel="noopener noreferrer"
          className="countdown-link"
        >
          COMPAGNIA III
        </a>
      </h2>
      <div className="countdown-date-subtitle">September 16 at 7:00 PM</div>
      <div className="countdown-clock" aria-label="Countdown timer to September 16 at 7 pm">
        <div className="countdown-item">
          <span className="countdown-value">{padZero(timeLeft.days)}</span>
          <span className="countdown-label">Days</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-item">
          <span className="countdown-value">{padZero(timeLeft.hours)}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-item">
          <span className="countdown-value">{padZero(timeLeft.minutes)}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-item">
          <span className="countdown-value">{padZero(timeLeft.seconds)}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;

