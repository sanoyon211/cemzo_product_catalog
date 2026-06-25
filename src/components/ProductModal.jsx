import { useEffect } from 'react';
import { formatCategory, formatPrice } from '../utils/formatters';

export function ProductModal({ product, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onClick={event => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} type="button">
          ×
        </button>
        <div className="modal-content">
          <img src={product.image} alt={product.title} />
          <div>
            <p className="category-pill">{formatCategory(product.category)}</p>
            <h2 id="product-modal-title">{product.title}</h2>
            <p className="modal-price">{formatPrice(product.price)}</p>
            <p>{product.description}</p>
            <p className="rating">
              Rating: {product.rating?.rate ?? 'N/A'} / 5
              <span>({product.rating?.count ?? 0} reviews)</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
