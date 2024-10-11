import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

import { Roboto } from 'next/font/google';
import Header from '@/components/header/header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProviderRedux from '@/lib/redux/ProviderRedux';
import { sendRequest, sendRequestFile } from '@/utils/fetchApi';
import { cookies } from 'next/headers';
import { InitialAccountRedux } from '@/lib/redux/slices/accountSlice';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialDataAccount: InitialAccountRedux | undefined = {
    _id: '',
    accessToken: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    cart: '',
    roles: '',
  };

  // test Redux
  const dataCookie = cookies();
  const accessToken_cookie = dataCookie.get('access_token');
  console.log(`accessToken_cookie:`, accessToken_cookie);
  const id = dataCookie.get('id');

  const res = await sendRequest<IBackendRes<IUser>>({
    method: 'GET',
    url: `localhost:3000/api/user/${id?.value}`,
    headers: { Authorization: `Bearer ${accessToken_cookie?.value}` },
  });

  //console.log('');
  //console.log('');
  //console.log('');
  //console.log('res', res);
  //console.log('');
  //console.log('');

  initialDataAccount = {
    _id: res.data?._id,
    accessToken: accessToken_cookie?.value,
    name: res.data?.name,
    email: res.data?.email,
    phone: res.data?.phone,
    address: res.data?.address,
    cart: res.data?.cart,
    roles: res.data?.roles,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-[#F4F6F8] overflow-x-hidden ${roboto.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProviderRedux initialDataAccount={initialDataAccount}>
            <Header></Header>
            <div className="lg:px-16   pt-16 overflow-x-hidden max-lg:px-3  max-lg:pt-[136px]">
              {children}
            </div>
          </ProviderRedux>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
