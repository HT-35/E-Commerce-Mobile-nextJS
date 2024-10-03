'use client';
import UserChat from '@/components/admin/chats/userChat';
import { typeMessage } from '@/components/chatClient/ChatClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cross1Icon, PaperPlaneIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const InputChat = ({
  handleActive,
  active,
  sendMessage,
  setMessage,
  message,
  showMessages,
}: {
  handleActive: any;
  active: any;
  sendMessage: any;
  setMessage: any;
  message: any;
  showMessages: typeMessage[];
}) => {
  //console.log('>>showMessages : ', showMessages);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [showMessages]);

  return (
    <div
      className={`formChat relative z-[999]   max-w-[350px] rounded-xl flex flex-col shadow-2xl transition-all duration-1000 
          ${active ? 'translate-y-0 opacity-100' : 'translate-y-[300%] opacity-0'}`}
    >
      <div className=" header basis-3/12   bg-[#DB2F17]  rounded-t-xl  flex justify-between items-center px-4 py-3">
        <UserChat name="Tư Vấn Viên" className="text-white">
          {''}
        </UserChat>
        <Cross1Icon
          className="w-8 h-8 p-2 rounded-full cursor-pointer hover:bg-gray-600"
          color="white"
          onClick={handleActive}
        ></Cross1Icon>
      </div>
      <div className="basis-6/12  message h-full bg-white min-h-[300px] max-h-[500px] ">
        <div className="message pl-4 mt-4 max-h-[300px]  overflow-y-auto">
          {showMessages.length > 0 &&
            showMessages.map(
              (item: { message: string; sender: string }, index) => {
                const showAvatar =
                  index === showMessages.length - 1 ||
                  showMessages[index].sender !== showMessages[index + 1].sender;
                return (
                  <div key={index} className="">
                    <div
                      className={` flex   
                       ${item.sender === 'employee' ? 'justify-start items-end' : ' items-end flex-row-reverse'}
                        
                       `}
                    >
                      <div className="w-5 h-5">
                        {showAvatar && (
                          <Image
                            src={'/imgs/employee.png'}
                            width="0"
                            height="0"
                            sizes="10vw"
                            className="shadow-2xl relative z-10 cursor-pointer"
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '100px',
                            }}
                            alt="Picture of the author"
                          ></Image>
                        )}
                      </div>
                      <div className="message pl-2">
                        <div
                          className={`rounded-xl  mb-2 max-w-max px-2 py-[2px]
                         ${item.sender === 'employee' ? 'bg-slate-200 mr-16' : ' bg-red-200 ml-16'}
                        `}
                        >
                          {item.message}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          <div ref={messageEndRef} />
        </div>
      </div>

      <div className="basis-3/12 py-2 px-3  input   bg-white rounded-b-xl border-t-[1px] border-slate-500">
        <div className="flex justify-start gap-2">
          <div className="w-10/12">
            <Input
              className="p-0 pl-4 border-0  rounded-none shadow-none focus:border-0 focus-visible:ring-0 focus-visible:border-0 group-hover:border-red-500"
              placeholder="Nhập nội dung ..."
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="w-2/12">
            <Button
              type="submit"
              className=" bg-transparent shadow-none hover:bg-transparent"
              onClick={sendMessage}
            >
              <PaperPlaneIcon
                color="black"
                height={25}
                width={25}
              ></PaperPlaneIcon>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputChat;
