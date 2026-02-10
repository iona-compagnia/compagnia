import type { FC } from 'react';
import './Home.css';
import Countdown from '../components/Countdown';
import FadeIn from '../components/FadeIn';
import OptimizedImage from '../components/OptimizedImage';

const Home: FC = () => {
  return (
    <div className="home-page">
      <div className="hero-container">
        <OptimizedImage 
          src="/images/home-bg.jpg" 
          alt="Compagnia Hero" 
          className="hero-image fill"
        />
        <div className="hero-content">
          <FadeIn direction="none">
            <div className="hero-logo-wrapper">
              <OptimizedImage 
                src="/images/logo-full.png" 
                alt="Compagnia Logo" 
                className="hero-logo"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.3} direction="none">
            <p className="hero-subtitle">Chamber music masterpieces in short form concerts.</p>
          </FadeIn>
          <FadeIn delay={0.6} direction="none">
            <Countdown />
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Home;