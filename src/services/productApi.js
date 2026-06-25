const API_URL = 'https://fakestoreapi.com/products';

export async function getProducts(signal) {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error('Failed to fetch products. Please try again.');
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid product response from server.');
  }

  return data;
}
