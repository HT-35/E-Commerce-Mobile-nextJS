import Image from 'next/image';
import React from 'react';

const UserChat = ({
  children,
  className,
  active,
  name,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  name: string;
}) => {
  return (
    <div
      className={`user flex justify-start items-center gap-4 cursor-pointer  rounded-lg  ${active ? 'bg-slate-300' : ''}`}
    >
      <div className="img w-10">
        <Image
          src={
            'https://avatars.githubusercontent.com/u/88173515?s=400&u=7d08d05134d70ba96aaf7b8da859322edd4853ee&v=4'
          }
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
        <h1 className="text-lg">{name}</h1>
        <div className="message text-sm ">{children}</div>
      </div>
    </div>
  );
};

export default UserChat;
