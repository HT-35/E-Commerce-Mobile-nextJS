/* eslint-disable react/prop-types */
'use client';
import Navigation from '@/components/navigation/Navigation';
import { NavigationFilter } from '@/components/navigationFilter/NavigationFilter';
import Title from '@/components/title/Title';

const subBanner = [
  {
    index: 1,
    url: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/c9/a3/c9a39b68eaf6efbb34033827e954728c.jpg',
  },
  {
    index: 2,
    url: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/f3/ba/f3baa27a529101c3c8cd65c5fe065430.jpg',
  },
];
const Banner = [
  {
    index: 1,
    url: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/c9/a3/c9a39b68eaf6efbb34033827e954728c.jpg',
  },
  {
    index: 2,
    url: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/f3/ba/f3baa27a529101c3c8cd65c5fe065430.jpg',
  },
  {
    index: 3,
    url: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/40/ab/40ab1ffa1f612eb67fc877c8b32a8582.png',
  },
];

const ListBrand = [
  {
    brand: 'Samsung',
    img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/31/ce/31ce9dafafac121361ee7cbd313ae76b.png',
  },
  {
    brand: 'iPhone',
    img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/92/e5/92e5003382a0bada9a770618b6c6099b.png',
  },
  {
    brand: 'Xiaomi',
    img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/e6/02/e602583e5e16acedfe54ab41b08b5d4f.png',
  },
  {
    brand: 'Oppo',
    img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/b6/26/b62674c18cc7ec4de1de3670812af13d.png',
  },
  {
    brand: 'Samsung',
    img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/31/ce/31ce9dafafac121361ee7cbd313ae76b.png',
  },
  {
    brand: 'iPhone',
    img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/92/e5/92e5003382a0bada9a770618b6c6099b.png',
  },
  {
    brand: 'Xiaomi',
    img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/e6/02/e602583e5e16acedfe54ab41b08b5d4f.png',
  },
  {
    brand: 'Oppo',
    img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/b6/26/b62674c18cc7ec4de1de3670812af13d.png',
  },
];

const filterPrice: { lable: string }[] = [
  {
    lable: 'dưới 2 tr',
  },
  {
    lable: 'từ 2 - 4 tr',
  },
  {
    lable: 'từ 4 - 8 tr',
  },
  {
    lable: 'từ 8 - 12 tr',
  },
];

const filterRam: { lable: string }[] = [
  {
    lable: '8 GB',
  },
  {
    lable: '16 GB',
  },
  {
    lable: '32 GB',
  },
];

const ProductPage = () => {
  return (
    <div className="min-h-[10000px] overflow-x-hidden select-none">
      <div className="navigation">
        <Navigation
          menu={false}
          Banner={Banner}
          subBanner={subBanner}
        ></Navigation>
      </div>

      <Title className="mt-5 mb-2 ">Hãng Điện Thoại</Title>

      <div className="brand flex  justify-between items-center ">
        {ListBrand.map((item, index) => {
          return (
            <div
              className={`px-4 py-1 border-2  rounded-3xl  ${index === 0 ? 'bg-[#F3F4F6]' : ''}`}
              key={index}
            >
              <img
                src={item.img}
                alt={item.brand}
                className="w-[91px]  h-[20px]"
              />
            </div>
          );
        })}
      </div>

      {/*<div className="flex justify-start items-center gap-3 my-4">
        <div className="">
          <Title className=" ">Bộ Lọc</Title>
        </div>
        <div className="filter price">
          <NavigationFilter
            filterData={filterPrice}
            lable="Price"
          ></NavigationFilter>
          <NavigationFilter
            filterData={filterRam}
            lable="Ram"
          ></NavigationFilter>
        </div>
      </div>*/}
    </div>
  );
};

export default ProductPage;

///////
