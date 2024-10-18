import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialAccountRedux {
  _id: string | undefined;
  accessToken: string | undefined;
  name: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  roles: string | undefined;
  email?: string | undefined;
  cart?: any;
}

const initialState: InitialAccountRedux = {
  _id: '',
  accessToken: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  cart: [],
  roles: '',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState, 
  reducers: {
    setDataAccount: (state, action: PayloadAction<InitialAccountRedux>) => {
      state._id = action.payload._id ?? state._id;
      state.roles = action.payload.roles ?? state.roles;
      state.name = action.payload.name ?? state.name; 
      state.email = action.payload.email ?? state.email;
      state.address = action.payload.address ?? state.address;
    },
    logout: (state) => {
      // Clear account state
      state._id = '';
      state.accessToken = '';
      state.name = '';
      state.email = '';
      state.cart = [];
      state.roles = '';
    },
    addToCart: (state, action: PayloadAction<any>) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item: any) => item._id === product._id);
      if (existingProduct) {
        // Update quantity if product is already in cart
        existingProduct.quatity += product.quatity;
      } else {
        // Add new product to cart
        state.cart.push({ ...product, checked: false });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item: any) => item._id !== action.payload);
    },
    updateProductQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find((item: any) => item._id === id);
      if (product) {
        product.quatity = quantity;
      }
    },
  },
});

export const { setDataAccount, logout, addToCart, updateProductQuantity, removeFromCart } = accountSlice.actions;

export default accountSlice.reducer;
