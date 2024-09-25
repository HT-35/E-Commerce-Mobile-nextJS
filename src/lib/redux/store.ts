// Khai Báo store

'use client';
// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';

export function createStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      account: accountReducer,
      // ...any
    },
    preloadedState, // Sử dụng preloadedState để khởi tạo giá trị ban đầu
  });
}
export type AppStore = ReturnType<typeof createStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
