import { StarIcon } from '../common/Icons';
import './StarRating.css';

function StarRating({ rating = 0, reviewCount }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      <span className="stars">
        {stars.map((s) => (
          <StarIcon key={s} className={s <= Math.round(rating) ? 'filled' : 'empty'} />
        ))}
      </span>
      {typeof reviewCount === 'number' && <span className="review-count">({reviewCount})</span>}
    </div>
  );
}

export default StarRating;
