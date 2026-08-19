import { Link } from 'react-router-dom';
import PlaceholderImage from '../common/PlaceholderImage';
import { YarnBallIcon } from '../common/Icons';
import './Hero.css';

// Drop the hero photo at this path (see public/images/hero/) to have it show automatically.
const HERO_IMAGE = '/images/hero/hero-main.png';

function Hero() {
  return (
    <section className="hero-section">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <clipPath id="heroWaveClip" clipPathUnits="objectBoundingBox">
          <path d="M0.10,0 C0.03,0.06 0.03,0.13 0.09,0.18 C0.14,0.24 0.14,0.32 0.06,0.4 C0.01,0.46 0.01,0.54 0.08,0.6 C0.13,0.65 0.12,0.72 0.07,0.8 C0.03,0.86 0.06,0.94 0.09,1 L1,1 L1,0 Z" />
        </clipPath>
      </svg>

      <div className="hero-image">
        <PlaceholderImage
          emoji="🧸"
          bg="#f2ddd7"
          sources={[HERO_IMAGE]}
          alt="Handmade crochet creation"
          rounded={false}
        />
      </div>

      <div className="container hero-inner">
        <div className="hero-text">
          <h1>
            Handmade Crochet
            <br />
            with Love <span className="hero-heart">♡</span>
          </h1>
          <p>
            Unique, cozy and crafted just for you. Made-to-order crochet products for
            every moment.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">
              Shop Now <span aria-hidden="true">→</span>
            </Link>
            <Link to="/custom-orders" className="btn btn-outline">
              Custom Order
            </Link>
          </div>
          <ul className="hero-trust">
            <li>♡ 100% Handmade</li>
            <li>🌿 Eco-friendly Yarns</li>
            <li>♡ Made with Love</li>
          </ul>
        </div>
      </div>

      <YarnBallIcon className="hero-doodle hero-doodle-yarn" aria-hidden="true" />
      <svg className="hero-doodle hero-doodle-swirl" viewBox="0 0 200 200" aria-hidden="true">
        <path
          d="M10 40 C 60 10, 110 10, 130 40 S 190 90, 160 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="1 9"
          strokeLinecap="round"
        />
      </svg>
      <svg className="hero-doodle hero-doodle-star" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 2l1.8 5.8L20 9l-5 4 1.6 6.2L12 16l-4.6 3.2L9 13 4 9l6.2-1.2z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </section>
  );
}

export default Hero;
