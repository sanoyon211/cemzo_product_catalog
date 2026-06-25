import { formatCategory, formatPrice } from '../utils/formatters';

export function ProductCard({ product, onViewDetails }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <span className="category-pill">
          {formatCategory(product.category)}
        </span>
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>

      <div className="product-body">
        <h2>{product.title}</h2>
        <p className="price">{formatPrice(product.price)}</p>
        <p className="rating">
          <span className="rating-star">★</span> {product.rating?.rate ?? 'N/A'}{' '}
          / 5
          <span className="review-count">
            ({product.rating?.count ?? 0} reviews)
          </span>
        </p>
      </div>

      <button
        type="button"
        onClick={() => onViewDetails(product)}
        className="view-btn"
      >
        View Details
      </button>
    </article>
  );
}
