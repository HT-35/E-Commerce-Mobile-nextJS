import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center mt-10 bg-gray-100 text-gray-800 ">
      {/*<h1 className="text-5xl font-bold mb-4">404</h1>*/}
      <Image src={'/imgs/source.gif'} width={500} height={500} className="w-48 h-48" alt=""></Image>
      <p className="mb-6">Không Website Không Tồn Tại</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Quay Lại Trang Chủ
      </Link>
    </div>
  );
}
