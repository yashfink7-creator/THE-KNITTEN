import { useEffect, useState } from 'react';
import './PlaceholderImage.css';

function PlaceholderImage({
  emoji = '🧶',
  bg = '#f4dde0',
  photo = null,
  sources = null,
  className = '',
  rounded = true,
  alt = '',
}) {
  const candidates = (sources && sources.length > 0 ? sources : [photo]).filter(Boolean);
  const key = candidates.join('|');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [key]);

  const current = candidates[index];

  if (current) {
    return (
      <div className={`placeholder-image photo ${rounded ? 'rounded' : ''} ${className}`}>
        <img src={current} alt={alt} onError={() => setIndex((i) => i + 1)} />
      </div>
    );
  }

  return (
    <div
      className={`placeholder-image ${rounded ? 'rounded' : ''} ${className}`}
      style={{ background: bg }}
      role="img"
      aria-label={alt || 'Product placeholder'}
    >
      <span>{emoji}</span>
    </div>
  );
}

export default PlaceholderImage;
