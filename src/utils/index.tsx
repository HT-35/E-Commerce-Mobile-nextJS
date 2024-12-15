// Type definition for Product
interface Product {
  price: number;
  salePrice: number;
  percentDiscount?: number;
}

// Handle percentage discount for products
export const handlePercentDiscount = (products: Product[]): Product[] => {
  const newList = products?.map((product) => {
    const percentDiscount = 100 - Math.round((product.salePrice * 100) / product.price);

    return { ...product, percentDiscount: percentDiscount };
  });
  return newList;
};

// Format price using Vietnamese currency format
export const formatPrice = (price: number): string => {
  const formatter = new Intl.NumberFormat('vi');
  return formatter.format(price);
};

// Format order creation date
export const formatDateCreateOrder = (timestamp: number): string => {
  const d = new Date(timestamp);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const seconds = d.getSeconds().toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
  const year = d.getFullYear();
  const formattedDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
  return formattedDate;
};

// Get the first character of a user's name
export const getFirstCharacterUser = (name: string): string => {
  const arrCharacter = name.split('')[0];
  return arrCharacter;
};

// Format date for PayPal order
export const formatDateOrderPaypal = (timestamp: number): string => {
  const d = new Date(timestamp);
  const date = d.getHours() + ':' + d.getMinutes() + ', ' + d.toDateString();
  return date;
};
