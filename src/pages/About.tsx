import type { FC } from 'react';
import FadeIn from '../components/FadeIn';
import './About.css';

const About: FC = () => {
  return (
    <div className="about-page">
      <FadeIn>
        <h1 className="page-title">About</h1>
      </FadeIn>
      <div className="about-content">
        <FadeIn delay={0.2}>
          <p className="pronunciation">compagnia | com·pa·gnì·a (Italian): company</p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="tagline">a company of musicians / in the company of friends</p>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <h2 className="section-subtitle">Our Mission</h2>
        </FadeIn>
        <FadeIn delay={0.5}>
          <p>Compagnia is a concert series that presents chamber music masterpieces in concerts under an hour, with a reception directly following.</p>
        </FadeIn>
        
        <FadeIn delay={0.6}>
          <p>Our goals are simple:</p>
        </FadeIn>
        <ul className="goals-list">
          <FadeIn delay={0.65}>
            <li>Build awareness of traditional chamber music masterpieces.</li>
          </FadeIn>
          <FadeIn delay={0.7}>
            <li>Foster connection between musicians and audience members.</li>
          </FadeIn>
          <FadeIn delay={0.75}>
            <li>Create a third space for people to regularly gather around a unique artistic experience.</li>
          </FadeIn>
        </ul>
      </div>
    </div>
  );
};

export default About;
