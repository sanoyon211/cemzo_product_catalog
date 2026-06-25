export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(price || 0));
}

export function formatCategory(category) {
  if (!category) return 'Uncategorized';
  return category.charAt(0).toUpperCase() + category.slice(1);
}
