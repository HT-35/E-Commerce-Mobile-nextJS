'use client';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

//const Banner = [
//  { index: 1, url: 'https://clickbuy.com.vn/uploads/media/639-ySdKf.png' },
//  { index: 2, url: 'https://clickbuy.com.vn/uploads/media/640-tBIDM.png' },
//  { index: 3, url: 'https://clickbuy.com.vn/uploads/media/636-ugZNo.png' },
//  { index: 4, url: 'https://clickbuy.com.vn/uploads/media/617-KpqUC.png' },
//  { index: 5, url: 'https://clickbuy.com.vn/uploads/media/631-ECeac.png' },
//];

const Slider = ({
  menu = true,
  Banner,
  witdh,
}: {
  menu?: boolean;
  Banner: {
    index: number;
    url: string;
    witdh?: string;
  }[];
}) => {
  return (
    <Carousel
      className="side-bar  bg-white text-center  rounded-lg shadow-xl "
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {Banner.map((item, index) => {
          return (
            <CarouselItem key={index}>
              {/*      ${witdh ? '' : 'lg:w-2/4 lg:h-[380px]'} */}
              <Card
                className={`flex w-full lg:h-[480px]   items-center justify-center rounded-lg relative  lg:max-h-[480px]
									${menu ? 'lg:h-[480px]' : 'lg:h-[230px]'}
             
									`}
              >
                <Image
                  src={`${item.url}`}
                  alt="smart-phone"
                  width="500"
                  height="500"
                  quality={100}
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  className="w-full object-cover rounded-lg h-full"
                  priority
                />
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Slider;
