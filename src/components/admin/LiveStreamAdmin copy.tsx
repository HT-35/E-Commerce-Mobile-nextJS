/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useAppSelector } from '@/lib/redux/hooks';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import { Input } from '@/components/ui/input';
import { SmileIcon } from '@/components/icons';
import useScreen from '@/components/hooks/useScreen';
import { Button } from '@/components/ui/button';

export interface Imessage {
  name: string;
  massage: string;
  role: string;
}

const LiveStream = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const [countView, setCountView] = useState<number>(0);

  const [listMessage, setListMessage] = useState<Imessage[]>([]);

  const router = useRouter();

  const [message, setMessage] = useState<string>('');

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    //return () => {};
  }, [listMessage]);

  const isMounted = useScreen()?.isMounted ?? false;
  const [activeEmojiPicker, setActiveEmojiPicker] = useState(false);

  const { _id, name } = useAppSelector((state) => state.account);

  if (!_id) {
    router.push('/auth');
  }

  const userVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);

  const socket = io(`http://localhost:5001`);

  useEffect(() => {
    socket.on('Admin-reciever-client', (viewerId) => {
      // gọi tới client sau khi server gửi viewerId của client
      navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: true }).then((stream) => {
        const call = peerInstance.current?.call(viewerId.viewerId, stream);
        call?.on('stream', (remoteStream) => {});
      });
    });

    return () => {};
  }, []);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: true }).then((stream) => {
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
    });

    return () => {};
  }, []);

  useEffect(() => {
    const peer = new Peer(_id as string);

    peer.on('open', (id) => {
      socket.emit('admin-Conect', { viewerId: id });
    });

    peerInstance.current = peer;

    return () => {
      peer.destroy();
    };
  }, [_id]);

  // get message by client
  useEffect(() => {
    socket.on('chat-all', (e) => {
      //console.log(e);
      const message: Imessage = {
        name: e.name,
        massage: e.message,
        role: e.role,
      };
      setListMessage((prev) => [...prev, message]);
    });

    socket.on('count-connect-stream', (e) => {
      setCountView(e);
    });

    return () => {
      socket.off('chat-all');
      socket.off('count-connect-stream');
    };
  }, []);
  //console.log(listMessage);

  const handleActiveEmojiPicker = () => {
    console.log('activeEmojiPicker :  ', activeEmojiPicker);

    setActiveEmojiPicker((prv) => !prv);
  };

  const handleGetOnEmojiClick = (emojiData: any, event: any) => {
    setMessage(message + emojiData.emoji);
    console.log(emojiData.emoji);
  };

  const handleSendMessageLiveStream = async () => {
    socket.emit('client-chat', { message, name, role: 'employee' });
    console.log(message);
    setMessage('');
  };

  return (
    <>
      <div className="title text-xs max-lg:text-sm flex items-center gap-4 my-2">
        <p className=" text-xs max-lg:text-sm">Số Người Xem: {countView} người</p>
        <Button className="h-6">Kết Thúc</Button>
      </div>

      <div className="flex xl:justify-between xl:items-center max-lg:flex-col gap-3 w-full  ">
        {/* video */}
        <div className="basis-8/12  ">
          <video className=" w-full h-full " ref={userVideoRef} autoPlay playsInline></video>
        </div>

        {/* message */}
        <div className="basis-4/12 h-full  rounded-md">
          <div className="message h-[500px] max-h-[450px] max-lg:max-h-[300px] max-md:max-h-[450px] overflow-y-auto text-xs max-lg:text-sm">
            {listMessage.map((item: Imessage, index) => {
              return (
                <div
                  key={index}
                  className={`flex justify-start items-center  gap-4 text-xs max-lg:text-sm mb-1
                ${item.role === 'employee' ? 'text-green-400' : 'text-black'}
                `}
                >
                  <div className="author">
                    <p>
                      {' '}
                      {item.name} {item.role === 'employee' ? '(admin)' : ''}:{' '}
                    </p>
                  </div>
                  <div className="massage">{item.massage}</div>
                </div>
              );
            })}
            <div className="" ref={messageEndRef}></div>
          </div>

          <div className="chat  h-1/6  flex justify-center items-center  gap-3 relative w-full py-2"></div>
        </div>
      </div>
    </>
  );
};

export default LiveStream;
