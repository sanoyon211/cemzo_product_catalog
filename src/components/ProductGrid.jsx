import { ProductCard } from './ProductCard';

export function ProductGrid({ products, onViewDetails }) {
  return (
    <section className="product-grid" aria-label="Product list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
        />
      ))}
    </section>
  );
}
