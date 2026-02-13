import { useState, useEffect } from 'react';
import type { FC } from 'react';
import './Countdown.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: FC = () => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const targetDate = new Date('2026-04-10T19:00:00');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <div className="countdown-expired">The event has started!</div>;
  }

  return (
    <div className="countdown-container">
      <h3 className="countdown-title">
        Next Concert: <a 
          href="https://www.eventbrite.com/e/compagnia-v-tickets-1981601448275?aff=oddtdtcreator" 
          target="_blank" 
          rel="noopener noreferrer"
          className="countdown-link"
        >
          Compagnia V
        </a>
      </h3>
      <div className="countdown-clock">
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.days}</span>
          <span className="countdown-label">Days</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.hours}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.minutes}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.seconds}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
