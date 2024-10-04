// Khởi tạo giá trị cho các
'use client';

import { Provider } from 'react-redux';

import { useMemo } from 'react';
import { createStore } from '@/lib/redux/store';
import Header from '@/components/header/header';
import { usePathname } from 'next/navigation';

export default function ProviderRedux({
  children,
  initialDataAccount,
}: {
  children: React.ReactNode;
  initialDataAccount?: any; // Dữ liệu ban đầu bạn muốn khởi tạo có thẻ truyền từ layout
}) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  const store = useMemo(() => {
    return createStore({
      account: initialDataAccount, // Truyền dữ liệu ban đầu vào slice `account`
    });
  }, [initialDataAccount]);

  return (
    <Provider store={store}>
      {!pathname.startsWith('/admin') && <Header />}
      {/*<div className="lg:px-16   pt-8 overflow-x-hidden max-lg:px-3  max-lg:pt-[136px]"> {children}</div>*/}
      {/*<div className="mt-4"> {children}</div>*/}

      <div
        className={` 
    ${
      pathname.startsWith('/admin')
        ? 'lg:px-16 p-2 !important overflow-x-hidden max-lg:px-3'
        : 'lg:px-16  pt-16 !important overflow-x-hidden max-lg:px-3 max-lg:pt-[136px]'
    }
  `}
      >
        {children}
      </div>
    </Provider>
  );
}
