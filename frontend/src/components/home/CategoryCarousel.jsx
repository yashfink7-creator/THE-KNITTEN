import { useRef } from 'react';
import { Link } from 'react-router-dom';
import categories from '../../data/categories';
import PlaceholderImage from '../common/PlaceholderImage';
import { ChevronLeftIcon, ChevronRightIcon } from '../common/Icons';
import './CategoryCarousel.css';

function CategoryCarousel() {
  const trackRef = useRef(null);

  function scroll(direction) {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.6;
    track.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  return (
    <section className="section category-section">
      <div className="container">
        <div className="section-heading">
          <h2>Shop by Category</h2>
          <div className="heading-divider">♡</div>
        </div>

        <div className="category-carousel">
          <button
            type="button"
            className="carousel-arrow left"
            aria-label="Scroll categories left"
            onClick={() => scroll('left')}
          >
            <ChevronLeftIcon />
          </button>

          <div className="category-track" ref={trackRef}>
            {categories.map((cat) => (
              <Link to={`/shop?category=${cat.slug}`} key={cat.id} className="category-item">
                <div className="category-thumb">
                  <PlaceholderImage emoji={cat.emoji} bg={cat.bg} sources={[cat.image, cat.photo]} alt={cat.name} />
                </div>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="carousel-arrow right"
            aria-label="Scroll categories right"
            onClick={() => scroll('right')}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CategoryCarousel;
