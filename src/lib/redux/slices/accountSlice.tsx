// redux/slices/accountSlice.ts
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
  cart: '',
  roles: '',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState, // Giá trị khởi tạo có thể bị ghi đè bởi preloadedState
  reducers: {
    setDataAccount: (state, action: PayloadAction<InitialAccountRedux>) => {
      console.log(action);

      state._id = action.payload._id ?? state._id;
      state.roles = action.payload.roles ?? state.roles;
      state.name = action.payload.name ?? state.name; // Cập nhật đúng tên state
      state.email = action.payload.email ?? state.email;
    },
  },
});

// redux/slices/accountSlice.ts
export const { setDataAccount } = accountSlice.actions;

export default accountSlice.reducer;
