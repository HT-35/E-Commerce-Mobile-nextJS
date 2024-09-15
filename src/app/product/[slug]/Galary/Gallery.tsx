'use client';
import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';

import type { Swiper as SwiperType } from 'swiper';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function GalaryImg({
  imgArr,
}: {
  imgArr: {
    index: number;
    url: string;
  }[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className=" xl:max-w-[730px]  select-none">
      <Swiper
        style={
          {
            '--swiper-pagination-color': '#fff',
          } as any
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {imgArr.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={item.url} />
            </SwiperSlide>
          );
        })}
        {}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {imgArr.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={item.url} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
