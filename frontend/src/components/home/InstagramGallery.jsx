import PlaceholderImage from '../common/PlaceholderImage';
import './InstagramGallery.css';

const GALLERY_ITEMS = [
  { emoji: '👜', bg: '#f0e6c9', image: '/images/products/crochet-clutch-purse.jpg', alt: 'Crochet Clutch Purse' },
  { emoji: '🦆', bg: '#eeddc8', image: '/images/products/crochet-duck.jpg', alt: 'Crochet Duck' },
  { emoji: '🌼', bg: '#f6e2b8', image: '/images/products/crochet-daisy-bouquet.jpg', alt: 'Crochet Daisy Bouquet' },
  { emoji: '💗', bg: '#f0e2e5', image: '/images/products/crochet-heart-keychain.jpg', alt: 'Crochet Heart Keychain' },
  { emoji: '🌹', bg: '#f4e9d8', image: '/images/products/crochet-coaster-set.jpg', alt: 'Crochet Coaster Set' },
];

function InstagramGallery() {
  return (
    <section className="section instagram-section">
      <div className="container">
        <div className="instagram-header">
          <div>
            <h2>From Our Crochet Corner</h2>
            <div className="heading-divider">♡</div>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="instagram-handle">
            Follow us on Instagram <strong>@theknitten_</strong>
          </a>
        </div>

        <div className="instagram-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <div className="instagram-item" key={i}>
              <PlaceholderImage emoji={item.emoji} bg={item.bg} sources={[item.image]} alt={item.alt} rounded={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InstagramGallery;
