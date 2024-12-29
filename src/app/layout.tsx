import './globals.css';
import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProviderRedux from '@/lib/redux/ProviderRedux';
import { sendRequest } from '@/utils/fetchApi';
import { cookies } from 'next/headers';
import { InitialAccountRedux } from '@/lib/redux/slices/accountSlice';
import { listApi_Next_Server } from '@/utils/listApi';
import { Metadata } from 'next';
import Head from 'next/head';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

//export const metadata: Metadata = {
//  title: {
//    template: '%s | HTS Store', //  HTS Store là tên website
//    default: 'HTS Store',
//  },
//  description: 'Store Smart Phone by Huy',
//};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'HTS Store | Store Smart Phone by Huy',
    description: 'Store Smart Phone by Huy',
    openGraph: {
      title: 'HTS Store | Store Smart Phone by Huy',
      description: 'Store Smart Phone by Huy',
      url: 'https://htsstore.io.vn/',
      siteName: 'HTS Store',
      images: [
        {
          url: 'https://res.cloudinary.com/huysa/image/upload/v1734582801/product/njyjzrdfrtc4siuv4bvf.jpg',
          width: 800,
          height: 600,
          alt: 'HTS Store product image', // Thêm alt text để cải thiện SEO
        },
      ],
      videos: [
        {
          url: 'https://www.youtube.com/watch?v=7OMFlDUz8JA',
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: 'https://htsstore.io.vn',
      languages: {
        'en-US': 'https://htsstore.io.vn/en-US',
        'de-DE': 'https://htsstore.io.vn/de-DE',
      },
    },
  };
}

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

        url: listApi_Next_Server.detailUser(id?.value!),
        headers: { Authorization: `Bearer ${accessToken_cookie?.value}` },
      });
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
      <Head>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <body className={`bg-[#F4F6F8] overflow-x-hidden ${roboto.className}`}>
        <ProviderRedux initialDataAccount={initialDataAccount}>
          <>{children}</>
        </ProviderRedux>
        <ToastContainer />
      </body>
    </html>
  );
}
