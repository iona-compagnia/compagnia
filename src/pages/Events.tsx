import { useState, useEffect } from 'react';
import type { FC } from 'react';
import FadeIn from '../components/FadeIn';
import './Events.css';

interface Event {
  id?: string;
  title?: string;
  name?: string; // fallback
  date: string;
  time: string;
  location: string;
  description: string;
  imageurl?: string;
}

const Events: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbzQeDdTD-XsBtrcZ52HaPm2T7r4XJTsaGPhZTbWVhsQSzqeV8CcjBRCmV6l5_nCZh2Q/exec?action=getEvents')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="events-page">
      <FadeIn>
        <h1 className="page-title">Upcoming Events</h1>
      </FadeIn>
      <div className="events-container">
        {loading ? (
          <p className="loading-msg">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="no-events-msg">No upcoming events at this time. Check back soon!</p>
        ) : (
          events.map((event, index) => (
            <FadeIn key={event.id || index} delay={0.2}>
              <div className="event-item">
                <h2 className="event-name">{event.title || event.name}</h2>
                <p className="event-date">{event.date}</p>
                <p className="event-time">{event.time}</p>
                <p className="event-location">{event.location}</p>
                <div className="event-description">
                  <p>{event.description}</p>
                </div>
              </div>
            </FadeIn>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;