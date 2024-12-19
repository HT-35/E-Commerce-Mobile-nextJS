import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SideBar = ({
  menu = true,
  subBanner,
  bannerHome = false,
}: {
  menu?: boolean;
  bannerHome?: boolean;
  subBanner: {
    index: number;
    url: string;
  }[];
}) => {
  return (
    <div
      className={`flex flex-col  items-center   h-full w-full relative  
					${menu ? 'lg:h-[500px] justify-between' : 'lg:h-[210px] justify-between '}
				`}
    >
      {subBanner?.length > 0 &&
        subBanner?.map((item, index) => {
          return (
            <Link href="/product" key={index}>
              <div className={` relative    ${menu ? 'w-[270px]' : 'w-[470px] '}`}>
                <Image
                  src={item?.url}
                  alt="smart-phone"
                  width="500"
                  height="500"
                  quality={100}
                  sizes="100vw"
                  className={` w-full  ${bannerHome ? 'lg:h-[163px]' : ''}   ${menu ? '' : 'h-[100px]   '}`}
                  priority
                ></Image>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default SideBar;
