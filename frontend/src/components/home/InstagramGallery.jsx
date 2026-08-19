import PlaceholderImage from '../common/PlaceholderImage';
import './InstagramGallery.css';

const GALLERY_ITEMS = [
  { emoji: '👜', bg: '#f0e6c9' },
  { emoji: '🧸', bg: '#eeddc8' },
  { emoji: '🌻', bg: '#f6e2b8' },
  { emoji: '🔑', bg: '#f0e2e5' },
  { emoji: '🌸', bg: '#f4e9d8' },
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
              <PlaceholderImage emoji={item.emoji} bg={item.bg} rounded={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InstagramGallery;
