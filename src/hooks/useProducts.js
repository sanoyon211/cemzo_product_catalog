import { useEffect, useState } from 'react';
import { getProducts } from '../services/productApi';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError('');
        const data = await getProducts(controller.signal);
        setProducts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong.');
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  return { products, isLoading, error };
}
