'use client';
import useActive from '@/components/hooks/useActive';

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { env } from '@/utils/listENV';
import IconChat from '@/components/chatClient/IconChat';
import InputChat from '@/components/chatClient/InputChat';
import { useAppSelector } from '@/lib/redux/hooks';
import { sendRequest } from '@/utils/fetchApi';
import { saveMessage } from '@/utils/saveMessage';

const PORT = env.NEXT_PUBLIC_PORT_SOCKET_SERVER();

const NEXT_PUBLIC_PORT_NEST_SERVER = env.NEXT_PUBLIC_PORT_NEST_SERVER();

const socket = io(`http://localhost:${PORT}`);

export interface typeMessage {
  sender: 'customer' | 'employee';
  message: string;
}

const ChatClient = () => {
  const { name, _id, accessToken } = useAppSelector((state: any) => state.account);

  const { active, handleActive } = useActive(false);

  // list tin nhắn cũ of customer
  const [showMessages, setShowMessages] = useState<typeMessage[]>([]);

  //lưu text of input
  const [message, setMessage] = useState('');

  if (_id) {
    socket.on('isConnect', (newMessage) => {});

    socket.emit('joinRoom', _id);
  }

  //  // lấy các tin nhắn cũ của customer
  useEffect(() => {
    if (_id) {
      const messageOld = async () => {
        const res = await sendRequest<IBackendRes<any>>({
          method: 'GET',
          url: `localhost:4000/chat/room/${_id}`,
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        //console.log(res);

        if (res.data !== null) {
          const newArrMessage = await res?.data?.messages?.map((item: any) => {
            return {
              sender: item.sender,
              message: item.content,
            };
          });
          setShowMessages(newArrMessage);
          //console.log(newArrMessage);
        }
      };
      messageOld();
    }
    return () => {};
  }, [_id, accessToken]);

  useEffect(() => {
    // Lắng nghe sự kiện nhận tin nhắn từ server
    socket.on('UserReceiveMessageByAdmin', (message) => {
      console.log('client nhận tin nhắn từ server', message);
      const newMessageOfEmployee: typeMessage = {
        message: message.message,
        sender: 'employee',
      };
      setShowMessages((prevMessages: any) => [...prevMessages, newMessageOfEmployee]);
    });

    return () => {
      socket.off('UserReceiveMessageByAdmin');
    };
  }, []);

  // gửi tin nhắn từ client tới server
  const sendMessage = async () => {
    //console.log(message);

    if (message.length > 0 && _id) {
      // lưu tin nhắn vào db
      await saveMessage({
        url: `localhost:${NEXT_PUBLIC_PORT_NEST_SERVER}/chat/send`,
        data: {
          customerId: _id,
          nameCustomer: name,
          messages: message,
        },
        token: accessToken,
      });
      //console.log('>>>  data : ', data);

      // Gửi tin nhắn của khách hàng tới server
      socket.emit('sendMessage', {
        userId: _id, // ID khách hàng
        message: message,
        name: name,
      });
      // thêm tin nhắn của customer
      const newMessageOfCustomer: typeMessage = {
        message: message,
        sender: 'customer',
      };
      setShowMessages((prevMessages: any) => [...prevMessages, newMessageOfCustomer]);

      setMessage('');
    }
  };

  return (
    <div className="relative transition-all duration-1000 z-[99]">
      {/* Icon Chat : zalo, fb , chat */}
      <IconChat active={active} handleActive={handleActive} />
      {/* Form Chat */}
      <InputChat
        active={active}
        handleActive={handleActive}
        sendMessage={sendMessage}
        setMessage={setMessage}
        message={message}
        showMessages={showMessages}
        _id={_id}
      />
    </div>
  );
};

export default ChatClient;

//const ChatClient = () => {};

//export default ChatClient;
