import type { FC } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import OptimizedImage from '../components/OptimizedImage';
import musiciansData from '../data/musicians.json';
import './Bio.css';

interface MusicianData {
  id: string;
  displayName: string;
  bioImageSrc: string;
  bio: string[];
}

const Director: FC = () => {
  const director = (musiciansData as MusicianData[]).find(m => m.id === 'director');

  if (!director) {
    return null;
  }

  return (
    <div className="bio-page">
      <div className="bio-container">
        <div className="bio-image-section">
          <FadeIn direction="right">
            <OptimizedImage 
              src={director.bioImageSrc} 
              alt={director.displayName} 
              className="bio-image" 
            />
          </FadeIn>
        </div>
        <div className="bio-text-section">
          <FadeIn delay={0.2} direction="left">
            <h1 className="bio-name">{director.displayName}, Director</h1>
            <div className="bio-text">
              {director.bio.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/Iona Batchelder/g, '<strong>Iona Batchelder</strong>') }} />
              ))}
            </div>
            <Link to="/musicians" className="back-link">← Back to Musicians</Link>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Director;