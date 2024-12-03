const domain = 'http://localhost:3000';
const domainNextServer = 'http://localhost:4000';

export const listApi = {
  getAllProduct: () => `${domain}/api/product?current=1&pageSize=1000`,
  updateProduct: (slug: string) => `${domain}/api/product?slug=${slug}`,
  getDetailProductbySlug: (slug: string) => `${domain}/api/product/${slug}`,
  createAccount: () => `${domain}/api/user`,
  getAllAccount: () => `${domain}/api/user?current=1&pageSize=10000`,
  deleteUser: (_id: string) => `${domain}/api/user?id=${_id}`,
  updateUser: (_id: string) => `${domain}/api/user?id=${_id}`,
  createAddress: () => `${domain}/api/address`,
  cart: () => `${domain}/api/cart`,
  createPayment: () => `${domainNextServer}/payment/create_payment_url`,
  createBill: () => `${domainNextServer}/user/bill/`,
};
