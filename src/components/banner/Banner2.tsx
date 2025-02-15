import Image from 'next/image';
import React from 'react';

const Banner2 = () => {
  return (
    <Image
      src={
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:800:150/q:90/plain/https://dashboard.cellphones.com.vn/storage/b2s-update-19-06%20(2).gif'
      }
      alt="smart-phone"
      width="0"
      height="0"
      sizes="100vw"
      className="w-full h-autorounded-lg"
      priority
    ></Image>
  );
};

export default Banner2;
