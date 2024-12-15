import { register } from 'module';

const domain = 'http://localhost:3000';
//const domain = 'http://14.225.254.209:3000'; // địa chỉ ip của vps deploy nextJS

//const domain = 'http://nextjs:3000';

const domainNextServer = 'http://localhost:4000';
//const domainNextServer = 'http://103.90.227.158:4000';
//const domainNextServer = 'http://nestjs:4000';

export const apiLiveStream = `http://localhost:5001`;
//export const apiLiveStream = `http://103.90.227.158:5001`;

export const apiChat = `http://localhost:5000`;
//export const apiChat = `http://103.90.227.158:5000`;

export const listApi_Next_Server = {
  getAllProduct: () => `${domain}/api/product?current=1&pageSize=1000`,
  updateProduct: (slug: string) => `${domain}/api/product?slug=${slug}`,

  detailProductSearchParam: (slug: string) => `${domain}/api/product?slug=${slug}`,

  getDetailProductbySlug: (slug: string) => `${domain}/api/product/${slug}`,
  createAccount: () => `${domain}/api/user`,
  getAllAccount: () => `${domain}/api/user?current=1&pageSize=10000`,
  deleteUser: (_id: string) => `${domain}/api/user?id=${_id}`,
  updateUser: (_id: string) => `${domain}/api/user?id=${_id}`,
  createAddress: () => `${domain}/api/address`,
  getAllAddress: () => `${domain}/api/address`,
  cart: () => `${domain}/api/cart`,

  createBillVnPay: () => `${domainNextServer}/user/bill/vnpay`,

  updateSuccessBill: (id: string) => `${domainNextServer}/user/vnpay/bill/${id}`,

  logout: () => `${domain}/api/auth/logout`,
  login: () => `${domain}/api/auth/login`,
  register: () => `${domain}/api/auth/register`,
  activeAcount: () => `${domain}/api/auth/active`,
  reSendOTP: (email: string) => `${domain}/api/auth/re-send-otp-code?email=${email}`,

  detailUser: (_id: string) => `${domain}/api/user/${_id}`,

  imgProduct: () => `${domain}/api/product/img`,

  createProduct: () => `${domain}/api/product`,

  reduceProductInCart: () => `${domain}/api/cart/reduce`,

  searchProduct: (name: string) => `${domain}/api/product/search?name=${name}`,
};

export const listApi_Nest_Server_API_Route = {
  address: () => `${domainNextServer}/user/address`,
  addressDetail: (_id: string) => `${domainNextServer}/user/address/${_id}`,
  activeAccount: () => `${domainNextServer}/auth/active`,
  login: () => `${domainNextServer}/auth/login`,
  newPassword: () => `${domainNextServer}/auth/new-password`,
  reSendCodeid: (email: string) => `${domainNextServer}/auth/re-send-codeid?email=${email}`,

  register: () => `${domainNextServer}/auth/register`,
  cart: () => `${domainNextServer}/user/cart`,

  reducerCart: () => `${domainNextServer}/user/cart/reduce`,

  getAllProduct: ({ current, pageSize }: { current: any; pageSize: any }) =>
    `${domainNextServer}/product?current=${current}&pageSize=${pageSize}`,

  getAllUser: ({ current, pageSize }: { current: any; pageSize: any }) =>
    `${domainNextServer}/user?current=${current}&pageSize=${pageSize}`,

  createProduct: () => `${domainNextServer}/product`,

  detailProduct: (slug: string) => `${domainNextServer}/product/${slug}`,

  getProductByBrand: (slug: string) => `${domainNextServer}/product/brand/${slug}`,

  productImg: () => `${domainNextServer}/product/img`,

  searchProductByName: (name: string) => `${domainNextServer}/product/search?name=${name}`,

  user: () => `${domainNextServer}/user`,
  detailUser: (slug: string) => `${domainNextServer}/user/${slug}`,
  updateUser: (id: string) => `${domainNextServer}/user/update/${id}`,
  deleteUser: (id: string) => `${domainNextServer}/user/delete/${id}`,

  getProductByBrandToLowerCase: (brand: string) => `${domainNextServer}/product/brand/${brand.toLowerCase()}`,

  //=====

  clientGetLiveStream: () => `${domainNextServer}/livestream/client-get-livestream`,

  clientSendMessageLiveStream: (_idLiveStream: string) => `${domainNextServer}/livestream/message/${_idLiveStream}`,

  employeeGetAllChat: () => `${domainNextServer}/chat/all`,

  employeeReply: () => `${domainNextServer}/chat/reply`,

  employeeGetDetailChatRoom: (userId: string) => `${domainNextServer}/chat/room/${userId}`,

  adminEndLiveStream: () => `${domainNextServer}/livestream/end/`,

  employeeSendMessageLiveStream: (_idLiveStream: string) => `${domainNextServer}/livestream/message/${_idLiveStream}`,

  adminCreateLiveStream: () => `${domainNextServer}/livestream`,
  adminEndLiveStreamDetail: (_idLiveStream: string) => `${domainNextServer}/livestream/end/${_idLiveStream}`,

  // ========================
  clientGetDetailChatRoom: (_id: string) => `${domainNextServer}/chat/room/${_id}`,

  clientSendMessageChat: () => `${domainNextServer}/chat/send`,

  getAdminGetAllOrder: () => `${domainNextServer}/user/bill?limit=15&page=1`,

  createPaymentVnPay: () => `${domainNextServer}/payment/create_payment_url`,

  updateSuccessBillVnPay: (id: string) => `${domainNextServer}/user/bill/vnpay/${id}`,

  createBillCOD: () => `${domainNextServer}/user/bill/cod`,

  getDetailBill: (id: string) => `${domainNextServer}/user/bill/${id}`,

  deleteProductInCart: ({ color, slug }: { slug: string; color: string }) =>
    `${domainNextServer}/user/cart/delete/${slug}?color=${color}`,
};
