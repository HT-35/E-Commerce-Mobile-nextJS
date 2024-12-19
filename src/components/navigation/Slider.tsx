'use client';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

const Slider = ({
  menu = true,
  Banner,
  //witdh,
}: {
  menu?: boolean;
  Banner: {
    index: number;
    url: string;
    //witdh?: string;
  }[];
}) => {
  return (
    <Carousel
      className="side-bar   text-center    bg-[#F4F6F8]    "
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{ loop: true }}
    >
      <CarouselContent style={{}} className="bg-[#F4F6F8] ">
        {Banner?.length > 0 &&
          Banner?.map((item, index) => {
            return (
              <CarouselItem key={index} style={{}} className="bg-[#F4F6F8] ">
                <Link href="/product" key={index}>
                  <Card
                    className={`flex w-full lg:h-[500px]    items-center justify-center  relative  lg:max-h-[500px]
									${menu ? 'lg:h-[500px] ' : 'lg:h-[210px]'}
									`}
                    style={{}}
                  >
                    <Image
                      src={item?.url}
                      alt="smart-phone"
                      width="500"
                      height="500"
                      quality={100}
                      sizes="100vw"
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',

                        backgroundColor: '#F4F6F8',
                      }}
                      className={` w-full  bg-[#F4F6F8]    ${menu ? 'h-[400px]' : 'h-[100px] '}`}
                      priority
                    ></Image>
                  </Card>
                </Link>
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
