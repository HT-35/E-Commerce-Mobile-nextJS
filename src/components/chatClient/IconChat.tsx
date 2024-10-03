import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const IconChat = ({
  handleActive,
  active,
}: {
  handleActive: any;
  active: any;
}) => {
  return (
    <div
      className={`  absolute transition-all duration-1000 bottom-0 right-0	${active ? 'translate-y-[200%] opacity-0' : 'opacity-100'}`}
    >
      <Link
        href={'https://zalo.me/0343128733'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="relative w-[60px] h-[60px] flex justify-center items-center mb-4">
          <Image
            src={'/imgs/zalo-icon.png'}
            width="0"
            height="0"
            sizes="10vw"
            className="shadow-2xl relative z-10"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '100px',
            }}
            alt="Picture of the author"
          ></Image>
          <div className=" absolute animate-ping w-[45px] h-[45px] bg-[#028FE4] rounded-full  "></div>
        </div>
      </Link>

      <Link
        href={'https://www.facebook.com/profile.php?id=100019061897122'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="relative w-[60px] h-[60px] flex justify-center items-center mb-4">
          <Image
            src={'/imgs/Facebook-icon.png'}
            width="0"
            height="0"
            sizes="10vw"
            className="shadow-2xl relative z-10 object-fill bg-transparent"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '100px',
            }}
            alt="Picture of the author"
          ></Image>
          <div className=" absolute animate-ping w-[45px] h-[45px] bg-[#E64A9E] rounded-full  "></div>
        </div>
      </Link>

      <div
        className="relative w-[60px] h-[60px] flex justify-center items-center mb-4 cursor-pointer"
        onClick={handleActive}
      >
        <Image
          src={'/imgs/chat-icon.jpg'}
          width="0"
          height="0"
          sizes="10vw"
          className="shadow-2xl relative z-10 cursor-pointer"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '100px',
          }}
          alt="Picture of the author"
        ></Image>
        <div className=" absolute animate-ping w-[45px] h-[45px] bg-red-300 rounded-full  cursor-pointer"></div>
      </div>
    </div>
  );
};

export default IconChat;
