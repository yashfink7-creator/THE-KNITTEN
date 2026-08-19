import { PlusIcon, MinusIcon } from '../common/Icons';
import './QuantitySelector.css';

function QuantitySelector({ quantity, onChange, min = 1, max = 99 }) {
  return (
    <div className="quantity-selector">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <MinusIcon />
      </button>
      <span>{quantity}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon />
      </button>
    </div>
  );
}

export default QuantitySelector;
