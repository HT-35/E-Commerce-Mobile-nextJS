import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProviderRedux from '@/lib/redux/ProviderRedux';
import { sendRequest } from '@/utils/fetchApi';
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
  const id = dataCookie.get('id');

  let res: any;
  if (accessToken_cookie?.value) {
    try {
      res = await sendRequest<IBackendRes<IUser>>({
        method: 'GET',
        url: `localhost:3000/api/user/${id?.value}`,
        headers: { Authorization: `Bearer ${accessToken_cookie?.value}` },
      });
      //console.log(`res:`, res);
    } catch (error) {
      console.log(error);
    }
  }

  initialDataAccount = {
    _id: res?.data?._id ?? '',
    accessToken: accessToken_cookie?.value ?? '',
    name: res?.data?.name ?? '',
    email: res?.data?.email ?? '',
    cart: res?.data?.cart ?? '',
    roles: res?.data?.roles ?? '',
    phone: res?.data?.phone ?? '',
    address: res?.data?.address ?? '',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-[#F4F6F8] overflow-x-hidden ${roboto.className}`}>
        {/*<ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >*/}
        <ProviderRedux initialDataAccount={initialDataAccount}>
          <>{children}</>
        </ProviderRedux>
        {/*</ThemeProvider>*/}
        <ToastContainer />
      </body>
    </html>
  );
}
