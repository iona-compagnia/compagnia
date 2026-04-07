import type { FC } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import './MusicianCard.css';

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: Record<string, unknown>) => void;
    };
  }
}

interface MusicianCardProps {
  name: string;
  imageSrc: string;
  link: string;
}

const MusicianCard: FC<MusicianCardProps> = ({ name, imageSrc, link }) => {
  return (
    <div className="musician-card">
      <div className="image-container">
        <OptimizedImage src={imageSrc} alt={name} className="musician-image" />
      </div>
      <div className="button-container">
        <Link 
          to={link} 
          className="musician-link"
          onClick={() => {
            if (window.umami) {
              window.umami.track('bio-view', { name });
            }
          }}
        >
          {name}
        </Link>
      </div>
    </div>
  );
};

export default MusicianCard;
