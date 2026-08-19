import PlaceholderImage from '../common/PlaceholderImage';
import './WhyChooseUs.css';

const FEATURES = [
  { icon: '🌿', title: 'Handmade', text: 'Each piece is carefully crocheted by hand.' },
  { icon: '♡', title: 'Customizable', text: 'Personalize your orders just the way you want.' },
  { icon: '✦', title: 'Premium Quality', text: 'We use the best yarns for long-lasting love.' },
  { icon: '♡', title: 'Made with Love', text: 'Every creation is stitched with love & care.' },
];

function WhyChooseUs() {
  return (
    <section className="section why-section">
      <div className="container why-inner">
        <div className="why-content">
          <h2>Why Choose The Knitten?</h2>
          <div className="why-features">
            {FEATURES.map((f) => (
              <div className="why-feature" key={f.title}>
                <span className="why-icon">{f.icon}</span>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="why-image">
          <PlaceholderImage
            emoji="🧶"
            bg="#f2d3d6"
            sources={['/images/hero/why-choose-yarn.jpg', 'https://images.unsplash.com/photo-1604510493959-8a20b3630d53?fm=jpg&q=80&w=1200&auto=format&fit=crop']}
            alt="Pink crochet yarn"
            rounded
          />
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
