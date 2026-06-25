import { formatCategory } from '../utils/formatters';

export function Controls({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  totalCount,
}) {
  return (
    <section className="controls" aria-label="Product search and filters">
      <div className="field-group">
        <label htmlFor="product-search">Search by product name</label>
        <input
          id="product-search"
          type="search"
          value={searchTerm}
          onChange={event => onSearchChange(event.target.value)}
          placeholder="Search bags, jackets, rings..."
        />
      </div>
      <div className="field-group">
        <label htmlFor="category-filter">Filter by category</label>
        <select
          id="category-filter"
          value={category}
          onChange={event => onCategoryChange(event.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map(item => (
            <option value={item} key={item}>
              {formatCategory(item)}
            </option>
          ))}
        </select>
      </div>
      <p className="result-count">Showing {totalCount} product(s)</p>
    </section>
  );
}
