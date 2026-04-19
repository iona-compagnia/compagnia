import type { FC } from 'react';
import FadeIn from '../components/FadeIn';
import eventsData from '../data/events.json';
import './Events.css';

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: Record<string, unknown>) => void;
    };
  }
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  musicians: string[];
  ticketLink?: string;
}

const Events: FC = () => {
  return (
    <div className="events-page">
      <FadeIn>
        <h1 className="page-title">Events</h1>
      </FadeIn>
      <div className="events-container">
        {(eventsData as Event[]).map((event, index) => (
          <FadeIn key={event.id} delay={0.2 + index * 0.15}>
            <div className="event-item">
              <h2 className="event-name">{event.name}</h2>
              <p className="event-date">{event.date}</p>
              <p className="event-time">{event.time}</p>
              <p className="event-location">{event.location}</p>
              <div className="event-description">
                <p>{event.description}</p>
                <ul className="musician-list">
                  {event.musicians.map((musician, mIndex) => (
                    <li key={mIndex}>{musician}</li>
                  ))}
                </ul>
              </div>
              {event.ticketLink && (
                <a 
                  href={event.ticketLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="tickets-button"
                  onClick={() => {
                    if (window.umami) {
                      window.umami.track('ticket-link-click', { concert: event.name });
                    }
                  }}
                >
                  Tickets on Eventbrite
                </a>
              )}
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.6}>
        <div className="debut-concert-section">
          <a 
            href="https://www.youtube.com/live/OjJ5fQ9LwRg?t=733&si=x4OUdvXdi6H_HQHy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="tickets-button"
            onClick={() => {
              if (window.umami) {
                window.umami.track('debut-concert-click');
              }
            }}
          >
            Watch our debut concert!
          </a>
        </div>
      </FadeIn>
    </div>
  );
};

export default Events;