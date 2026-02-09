import type { FC } from 'react';
import MusicianCard from '../components/MusicianCard';
import FadeIn from '../components/FadeIn';
import musiciansData from '../data/musicians.json';
import './Musicians.css';

interface Musician {
  id: string;
  name: string;
  imageSrc: string;
  link: string;
}

const Musicians: FC = () => {
  return (
    <section className="musicians-section">
      <FadeIn>
        <h1 className="page-title">Musicians</h1>
      </FadeIn>
      <div className="musicians-grid">
        {(musiciansData as Musician[]).map((musician, index) => (
          <FadeIn key={musician.id} delay={0.1 + index * 0.1}>
            <MusicianCard 
              name={musician.name}
              imageSrc={musician.imageSrc}
              link={musician.link}
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default Musicians;
