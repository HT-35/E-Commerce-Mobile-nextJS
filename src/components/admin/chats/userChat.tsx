import Image from 'next/image';
import React from 'react';

const UserChat = ({
  children,
  className,
  active,
  name,
  userId,
  //joinRoom = (name: string, userId: string) => {},
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  name: string;
  userId?: string;
  //joinRoom?: any;
}) => {
  return (
    <div
      className={`user flex justify-start items-center gap-4 cursor-pointer  rounded-lg  ${active ? 'bg-slate-300' : ''}`}
      //onClick={joinRoom({ name, userId })}
    >
      <div className="img xl:w-10 max-xl:w-5">
        <Image
          src={'/imgs/employee.png'}
          width="0"
          height="0"
          sizes="100vw"
          style={{
            width: '100px',
            height: 'auto',
            borderRadius: '100px',
          }}
          alt="Picture of the author"
        ></Image>
      </div>

      <div className={`message ${className}`}>
        <h1 className="xl:text-lg max-xl:text-sm">{name}</h1>
        <div className="message text-sm ">{children}</div>
      </div>
    </div>
  );
};

export default UserChat;
