import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-20 bg-gray-100 text-gray-800 ">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="mb-6">This page could not be found.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back home
      </Link>
    </div>
  );
}
