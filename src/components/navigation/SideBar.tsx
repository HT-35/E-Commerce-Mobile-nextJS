import Image from 'next/image';
import React from 'react';

const SideBar = ({
  menu = true,
  subBanner,
}: {
  menu?: boolean;
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
      {subBanner.map((item) => {
        return (
          <div key={item.index} className={` relative    ${menu ? 'w-[270px]' : 'w-[470px] '}`}>
            <Image
              src={item.url}
              alt="smart-phone"
              width="500"
              height="500"
              quality={100}
              sizes="100vw"
              className={` w-full   ${menu ? '' : 'h-[100px] '}`}
              priority
            ></Image>
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
