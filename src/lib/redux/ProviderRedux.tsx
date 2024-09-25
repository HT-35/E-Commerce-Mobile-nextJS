// Khởi tạo giá trị cho các
'use client';

import { Provider } from 'react-redux';

import { useMemo } from 'react';
import { createStore } from '@/lib/redux/store';

export default function ProviderRedux({
  children,
  initialDataAccount,
}: {
  children: React.ReactNode;
  initialDataAccount?: any; // Dữ liệu ban đầu bạn muốn khởi tạo có thẻ truyền từ layout
}) {
  const store = useMemo(() => {
    return createStore({
      account: initialDataAccount, // Truyền dữ liệu ban đầu vào slice `account`
    });
  }, [initialDataAccount]);

  return <Provider store={store}>{children}</Provider>;
}
