import { useEffect } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import './Archduke.css';

const Archduke: FC = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Beethoven’s Piano Trio Op. 97, “Archduke” | Compagnia';

    // Set robots meta tag to noindex for private page
    let metaRobots = document.querySelector('meta[name="robots"]');
    const created = !metaRobots;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    const prevRobots = metaRobots.getAttribute('content');
    metaRobots.setAttribute('content', 'noindex, nofollow');

    return () => {
      document.title = prevTitle;
      if (created && metaRobots?.parentNode) {
        metaRobots.parentNode.removeChild(metaRobots);
      } else if (prevRobots) {
        metaRobots.setAttribute('content', prevRobots);
      } else if (metaRobots) {
        metaRobots.removeAttribute('content');
      }
    };
  }, []);

  return (
    <article className="archduke-page">
      <header className="archduke-header">
        <FadeIn>
          <h1 className="archduke-page-title">
            Beethoven’s Piano Trio Op. 97, “Archduke”
          </h1>
        </FadeIn>
      </header>

      <div className="archduke-intro">
        <FadeIn delay={0.15}>
          <p>
            Ludwig van Beethoven (1770–1827) is widely regarded as one of the greatest composers of all time. His works are generally divided into three periods: an early “Classical” era (reminiscent of Haydn or Mozart), a middle period of experimentation and expansion, and a late “Romantic” era (foreshadowing Brahms). This piece was written late in his middle era.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p>
            Beethoven began experiencing hearing loss at 28, which eventually led to near-total deafness in his 40s. Notably, the “Archduke” trio was the very last piece Beethoven ever performed in public as a pianist before his hearing loss forced him to retire from the stage.
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p>
            The piano trio (piano, violin, and cello) was popularized by Haydn. In its early form, it functioned more like a violin-piano duet, with the cello simply doubling the piano's bass line. Mozart elevated the cello into a more independent voice, but it wasn't until Beethoven that the three instruments truly became equals. Beethoven’s Op. 97 trio, the last piano trio he ever composed, received its nickname from its dedication to Archduke Rudolph of Austria, who was a patron, friend, and amateur adult student of Beethoven’s. While there are occasional classical moments, the piece is remarkably Romantic in scale and style.
          </p>
        </FadeIn>
      </div>

      <div className="archduke-divider" aria-hidden="true" />

      <section className="movements-container" aria-label="Movements">
        <FadeIn delay={0.45}>
          <div className="movement-card">
            <h2 className="movement-title">I. Allegro moderato (Fast)</h2>
            <div className="movement-body">
              <p>
                The first five notes of the piece form the main motif of this movement, returning again and again. As the movement unfolds, listen to how Beethoven scores this motif across different octaves and between all three instruments.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.55}>
          <div className="movement-card">
            <h2 className="movement-title">II. Scherzo (Fast and light)</h2>
            <div className="movement-body">
              <p>
                Scherzo translates to “joke” in Italian, and these movements are generally light and unserious. This one is no exception, but keep an ear out for the middle of the movement: it features a deeply dark, undulating character that serves as a stark contrast to the lighthearted beginning and end.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.65}>
          <div className="movement-card">
            <h2 className="movement-title">III. Andante cantabile (Slow)</h2>
            <div className="movement-body">
              <p>
                This is an absolutely beautiful theme-and-variations movement. The piano begins by presenting the theme of the movement with accompaniment from the violin and cello before morphing into different variations, each with its own unique character and instrumentation. While all the variations are incredible, the slow Adagio variation towards the end is painfully gorgeous and (in my opinion) one of the best moments in the entire trio.
              </p>
              <p className="movement-note">
                (Note: this movement does not have a traditional ending—it shifts into the final movement without a pause!)
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.75}>
          <div className="movement-card">
            <h2 className="movement-title">IV. Allegro moderato – Presto (Fast)</h2>
            <div className="movement-body">
              <p>
                The finale is a rondo, a musical form featuring a main theme that returns several times throughout the movement. At one point, this includes a rendition in a particularly high and difficult register for the cello (a rarity for a piano trio!). After the theme has come back several times, a lightning fast presto section pulls us through several different keys before finally arriving home to the triumphant B-flat Major sonority that began the piece.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <div className="archduke-navigation">
        <FadeIn delay={0.85}>
          <Link to="/" className="back-link">← Compagnia Home</Link>
        </FadeIn>
      </div>
    </article>
  );
};

export default Archduke;
