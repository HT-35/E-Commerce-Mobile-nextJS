'use client';
export function formatCurrency(amount: string) {
  if (!amount) {
    return '';
  }
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
