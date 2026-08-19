import { Link } from 'react-router-dom';
import PlaceholderImage from '../components/common/PlaceholderImage';
import './AboutUs.css';

const VALUES = [
  { icon: '🧶', title: 'Handcrafted', text: 'Every single piece is crocheted by hand, stitch by stitch.' },
  { icon: '🌿', title: 'Sustainable', text: 'We use eco-friendly, responsibly sourced yarns wherever we can.' },
  { icon: '♡', title: 'Made to Order', text: 'No mass production — your piece is made just for you.' },
  { icon: '✦', title: 'Small Business', text: 'A one-woman studio pouring love into every order.' },
];

function AboutUs() {
  return (
    <div className="about-page">
      <div className="page-hero">
        <h1>About The Knitten</h1>
        <p>The story behind every stitch.</p>
      </div>

      <section className="section about-story">
        <div className="container about-story-inner">
          <div className="about-image">
            <PlaceholderImage emoji="🧵" bg="#f4dde0" className="lg" />
          </div>
          <div className="about-text">
            <span className="eyebrow">Our Story</span>
            <h2>From a hobby to a hand-crafted business</h2>
            <p>
              The Knitten began as a quiet weekend hobby — a hook, a ball of yarn, and a love for
              making things by hand. What started as gifts for friends and family slowly grew into
              a small studio dedicated to handmade crochet creations.
            </p>
            <p>
              Today, every bouquet, bag, plushie and accessory that leaves our studio is still made
              one stitch at a time, with the same care and intention we started with — because
              handmade means something made with heart.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Explore Our Products
            </Link>
          </div>
        </div>
      </section>

      <section className="section about-values">
        <div className="container">
          <div className="section-heading">
            <h2>What We Stand For</h2>
            <div className="heading-divider">♡</div>
          </div>
          <div className="values-grid">
            {VALUES.map((v) => (
              <div className="value-card" key={v.title}>
                <span className="value-icon">{v.icon}</span>
                <h4>{v.title}</h4>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-cta">
        <div className="container about-cta-inner">
          <h2>Looking for something one-of-a-kind?</h2>
          <p>We'd love to crochet something custom, just for you.</p>
          <Link to="/custom-orders" className="btn btn-outline">
            Start a Custom Order
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
