import { formatCategory, formatPrice } from '../utils/formatters';

export function ProductCard({ product, onViewDetails }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className="product-body">
        <p className="category-pill">{formatCategory(product.category)}</p>
        <h2>{product.title}</h2>
        <p className="price">{formatPrice(product.price)}</p>
        <p className="rating">
          Rating: {product.rating?.rate ?? 'N/A'} / 5
          <span>({product.rating?.count ?? 0} reviews)</span>
        </p>
      </div>
      <button type="button" onClick={() => onViewDetails(product)}>
        View Details
      </button>
    </article>
  );
}
