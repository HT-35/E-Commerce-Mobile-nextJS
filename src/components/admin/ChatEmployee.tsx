'use client';

import UserChat from '@/components/admin/chats/userChat';
import { typeMessage } from '@/components/chatClient/ChatClient';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/lib/redux/hooks';
import { sendRequest } from '@/utils/fetchApi';
import { env } from '@/utils/listENV';
import { saveMessage } from '@/utils/saveMessage';
import Image from 'next/image';

import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const PORT_SOCKET = env.NEXT_PUBLIC_PORT_SOCKET_SERVER();

const PORT_NEST = env.NEXT_PUBLIC_PORT_NEST_SERVER();

const socket = io(`http://localhost:${PORT_SOCKET}`);

export interface typeListChatUser {
  nameCustomer: string;
  customerId: string;
  isWaitingForReply: boolean;
  lastMessage: string;
}

const ChatEmployee = () => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  socket.on('isConnect', (newMessage) => {
  });

  const { name, _id, accessToken, email } = useAppSelector((item) => item.account);

  const [userList, setUserList] = useState<typeListChatUser[]>([]); // Danh sách các khách hàng chờ
  const [messages, setMessages] = useState<typeMessage[]>([]); // Tin nhắn của của nhân viên và khách hàng
  const [currentUserId, setCurrentUserId] = useState<{
    name: string;
    userId: string;
  }>({
    name: '',
    userId: '',
  });

  // lấy ra danh sách người dùng đã ngắn tin
  useEffect(() => {
    const listCustomerChat = async () => {
      const res = await sendRequest<IBackendRes<any>>({
        url: `localhost:${PORT_NEST}/chat/all`,
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      //console.log(res);
      const listArrChat = await res?.data?.map((item: any, index: number) => {
        return {
          nameCustomer: item.nameCustomer,
          customerId: item.customerId,
          isWaitingForReply: item.isWaitingForReply,
          lastMessage: item.lastMessage,
        };
      });
      setUserList(listArrChat);
    };
    listCustomerChat();
  }, [accessToken]);

  //nhận tin nhắn từ customer
  useEffect(() => {
    socket.on('AdminReceiveMessageByUser', async ({ userId, name, message }) => {
      const res = await sendRequest<IBackendRes<any>>({
        url: `localhost:${PORT_NEST}/chat/all`,
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const listArrChat: typeListChatUser[] = await res.data.map((item: any, index: number) => {
        return {
          nameCustomer: item.nameCustomer,
          customerId: item.customerId,
          isWaitingForReply: item.isWaitingForReply,
          lastMessage: item.lastMessage,
        };
      });
      setUserList(listArrChat);

      const newMessage: typeMessage = {
        sender: 'customer',
        message,
      };

      setMessages((prev: any) => [...prev, newMessage]);
    });

    return () => {
      socket.off('AdminReceiveMessageByUser');
    };
  }, [accessToken]);

  useEffect(() => {
    console.log(currentUserId);
  }, [currentUserId]);

  const joinRoom = async (name: string, userId: string) => {
    // Nhân viên tham gia phòng của khách hàng với userId
    setCurrentUserId({ name, userId });
    socket.emit('joinRoom', userId);

    const res = await sendRequest<IBackendRes<any>>({
      method: 'GET',
      url: `localhost:4000/chat/room/${userId}`,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.data !== null) {
      const newArrMessage = await res?.data?.messages?.map((item: any) => {
        return {
          sender: item.sender,
          message: item.content,
        };
      });
      setMessages(newArrMessage);
    }
  };

  const replyMessage = async (message: string) => {
    if (currentUserId && message.length > 0) {

      const saveMessage123 = await saveMessage({
        url: `localhost:${PORT_NEST}/chat/reply/`,
        data: {
          customerId: currentUserId.userId,
          employeeId: _id,
          messages: message,
        },
        token: accessToken!,
      });
      console.log(saveMessage123);

      socket.emit('replyMessage', {
        userId: currentUserId.userId,
        message: message,
      });

      const findIndex = userList.findIndex((item) => item.customerId === currentUserId.userId);
      console.log(`findIndex:`, findIndex);

      setUserList((prv: any): any => {
        let updateData = prv[findIndex];
        updateData.isWaitingForReply = false;
        //const newPrv =
        return prv;
      });

      // thêm tin nhắn vào message
      setMessages((prev: typeMessage[]) => [
        ...prev,
        {
          sender: 'employee',
          message,
        },
      ]);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-[650px] max-xl:h-[500px] overflow-hidden ">
      {/* List User Chat */}
      <div className="user basis-3/12 h-full overflow-y-auto flex flex-col gap-6 pr-1 border-r-2">
        {userList?.map((item: typeListChatUser, index: any) => {
          return (
            <div key={index} onClick={() => joinRoom(item.nameCustomer, item.customerId)}>
              <UserChat
                className={` max-xl:text-sm  ${item.isWaitingForReply ? 'text-red-600' : 'text-black'}`}
                name={item.nameCustomer}
                userId={item.customerId}
                active
              >
                {''}
              </UserChat>
            </div>
          );
        })}
      </div>

      {/* Detail User Chat */}

      <div className="chatMessage basis-9/12  ">
        {currentUserId?.name?.length > 0 ? (
          <div className="flex flex-col">
            <div className="header bg-slate-300 rounded-xl px-2 mx-2 ">
              <UserChat name={currentUserId?.name ?? ' '} className="">
                {''}
              </UserChat>
            </div>

            {/* content */}
            <div className="message pl-4 mt-4 max-xl:h-[375px] h-[500px] overflow-y-auto ">
              {messages.length > 0 &&
                messages.map((item: { message: string; sender: string }, index) => {
                  const showAvatar =
                    index === messages.length - 1 || messages[index].sender !== messages[index + 1].sender;
                  return (
                    <div key={index} className="">
                      <div
                        className={` flex   
                        ${item.sender === 'employee' ? 'justify-start  items-end flex-row-reverse' : 'items-end '}
                        
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
                         ${item.sender !== 'employee' ? 'bg-slate-200 mr-16' : ' bg-red-200 ml-16'}
                        `}
                          >
                            {item.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div ref={messageEndRef}></div>
            </div>

            {/* input */}
            <div className="keyBoard input w-full border-t-2 py-2 ">
              <div className="flex justify-start gap-2 ">
                <div className="w-12/12">
                  <Input
                    type="text"
                    className="p-0 pl-4 border-0  rounded-none shadow-none focus:border-0 focus-visible:ring-0 focus-visible:border-0 group-hover:border-red-500"
                    placeholder="Nhập nội dung ..."
                    autoComplete="off"
                    onKeyDown={(e: any) => {
                      if (e.key === 'Enter') {
                        replyMessage(e.target.value);

                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ChatEmployee;
