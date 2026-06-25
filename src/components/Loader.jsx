export function Loader() {
  return (
    <section className="skeleton-grid" aria-label="Loading products">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-image" />
          <div className="skeleton-line wide" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
      ))}
    </section>
  );
}


export function ErrorState({ message, onRetry }) {
  return (
    <section className="state-card" role="alert">
      <h2>Could not load products</h2>
      <p>{message}</p>
      <button type="button" onClick={onRetry}>
        Refresh Page
      </button>
    </section>
  );
}



export function EmptyState() {
  return (
    <section className="state-card">
      <h2>No products found</h2>
      <p>Try changing the search text or category filter.</p>
    </section>
  );
}