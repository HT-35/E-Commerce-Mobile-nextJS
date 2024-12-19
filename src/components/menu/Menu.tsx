import Link from 'next/link';
import React from 'react';
import { map } from 'zod';
const ListBrand: any[] = [
  {
    brand: 'APPLE',
  },
  {
    brand: 'SAMSUNG',
  },
  {
    brand: 'XIAOMI',
  },
  {
    brand: 'OPPO',
  },
];
const Menu = () => {
  return (
    <div className="flex flex-col justify-between items-start h-full w-full">
      {ListBrand?.length > 0 &&
        ListBrand?.map((item, index) => {
          return (
            <Link
              href={`/product?brand=${item.brand}`}
              key={index}
              className="py-1 px-4 w-full  hover:bg-slate-200 cursor-pointer hover:rounded-lg"
            >
              {item.brand}
            </Link>
          );
        })}
    </div>
  );
};

export default Menu;
