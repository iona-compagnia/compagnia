import type { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
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

const Bio: FC = () => {
  const { musicianId } = useParams<{ musicianId: string }>();
  const musician = (musiciansData as MusicianData[]).find(m => m.id === musicianId);

  if (!musician) {
    return (
      <div className="bio-page">
        <FadeIn>
          <h1>Musician not found</h1>
          <Link to="/musicians">Back to Musicians</Link>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="bio-page">
      <div className="bio-container">
        <div className="bio-image-section">
          <FadeIn direction="right">
            <OptimizedImage src={musician.bioImageSrc} alt={musician.displayName} className="bio-image" />
          </FadeIn>
        </div>
        <div className="bio-text-section">
          <FadeIn delay={0.3} direction="left">
            <h1 className="bio-name">{musician.displayName}</h1>
          </FadeIn>
          <div className="bio-text">
            {musician.bio.map((paragraph, index) => (
              <FadeIn key={index} delay={0.5 + index * 0.2} direction="left">
                <p>{paragraph}</p>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.7 + musician.bio.length * 0.2} direction="left">
            <Link to="/musicians" className="back-link">← Back to Musicians</Link>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Bio;
