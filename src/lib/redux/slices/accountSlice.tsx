// src/lib/redux/slices/accountSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialAccountRedux {
  _id: string | undefined;
  accessToken: string | undefined;
  name: string | undefined;
  roles: string | undefined;
  email?: string | undefined;
  cart?: any;
}

const initialState: InitialAccountRedux = {
  _id: '',
  accessToken: '',
  name: '',
  email: '',
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
  },
});

export const { setDataAccount, logout } = accountSlice.actions;

export default accountSlice.reducer;
