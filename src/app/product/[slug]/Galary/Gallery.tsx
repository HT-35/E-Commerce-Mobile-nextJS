/* eslint-disable @next/next/no-img-element */
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
import { IimgArr } from '@/app/product/[slug]/page';

export default function GalaryImg({ imgArr, className }: { imgArr: IimgArr[]; className?: string }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={` xl:max-w-[830px] xl:h-[590px] max-xl:h-[400px]  select-none ${className}`}>
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
            <SwiperSlide key={index} className=" rounded-lg">
              <SwiperSlide key={index}>
                <img src={item.link} alt="phone" />
              </SwiperSlide>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={6}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {imgArr.map((item, index) => {
          return (
            <SwiperSlide key={index} className="w-10 h-20">
              <img src={item.link} alt="phone" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
