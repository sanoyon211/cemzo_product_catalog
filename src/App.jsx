import { useMemo, useState } from 'react';
import './App.css';
import { AppHeader } from './components/AppHeader';
import { Controls } from './components/Controls';
import { EmptyState, ErrorState, Loader } from './components/Loader';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { ThemeProvider } from './context/ThemeContext';
import { useDebounce } from './hooks/useDebounce';
import { useProducts } from './hooks/useProducts';

const PRODUCTS_PER_PAGE = 8;

function ProductCatalog() {
  const { products, isLoading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(product => product.category)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = debouncedSearchTerm.trim().toLowerCase();
    return products.filter(product => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(normalizedSearch);
      const matchesCategory =
        category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, debouncedSearchTerm, category]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleSearchChange = value => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = value => {
    setCategory(value);
    setCurrentPage(1);
  };

  return (
    <main className="app-shell">
      <AppHeader />
      <Controls
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        totalCount={filteredProducts.length}
      />
      {isLoading && <Loader />}
      {!isLoading && error && (
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      )}
      {!isLoading && !error && filteredProducts.length === 0 && <EmptyState />}
      {!isLoading && !error && filteredProducts.length > 0 && (
        <>
          <ProductGrid
            products={paginatedProducts}
            onViewDetails={setSelectedProduct}
          />
          <div className="pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(page => page - 1)}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(page => page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ProductCatalog />
    </ThemeProvider>
  );
}
