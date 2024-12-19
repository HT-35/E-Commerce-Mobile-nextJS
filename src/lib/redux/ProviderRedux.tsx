// Khởi tạo giá trị cho các
'use client';

import { Provider } from 'react-redux';

import { useMemo } from 'react';
import { createStore } from '@/lib/redux/store';
import Header from '@/components/header/header';
import { usePathname } from 'next/navigation';
import ChatClient from '@/components/chatClient/ChatClient';

export default function ProviderRedux({
  children,
  initialDataAccount,
}: {
  children: React.ReactNode;
  initialDataAccount?: any; // Dữ liệu ban đầu bạn muốn khởi tạo có thẻ truyền từ layout
}) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  const checkPageAdmin = pathname.startsWith('/admin') ? true : false;
  const checkPageLivestream = pathname.startsWith('/livestream') ? true : false;

  const store = useMemo(() => {
    return createStore({
      account: initialDataAccount, // Truyền dữ liệu ban đầu vào slice `account`
    });
  }, [initialDataAccount]);

  return (
    <Provider store={store}>
      {!checkPageAdmin && <Header />}
      {!checkPageAdmin &&
        !pathname.startsWith('/auth') &&
        !pathname.startsWith('/cart') &&
        !pathname.startsWith('/bill') &&
        !pathname.startsWith('/user') &&
        !pathname.startsWith('/livestream') && (
          <div
            className="fixed  right-4 z-[9999]  max-lg:w-[100px]"
            style={{
              bottom: '40px',
            }}
          >
            <ChatClient />
          </div>
        )}
      <div className={` ${checkPageAdmin === true || checkPageLivestream === true ? '' : 'formatPage'}`}>
        {' '}
        {children}
      </div>
    </Provider>
  );
}
