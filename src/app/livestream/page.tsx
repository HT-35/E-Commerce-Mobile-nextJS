/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useAppSelector } from '@/lib/redux/hooks';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';

import { Imessage } from '@/components/admin/LiveStreamAdmin';
import { sendRequest } from '@/utils/fetchApi';
import { InputChatLiveStreamForm } from '@/components/admin/form/FormInputLiveStream';
import BackGroundLiveStream from '@/components/animation/BackGroundLiveStream';

const socket = io(`http://localhost:5001`);

const LiveStream = () => {
  const [_idLiveStream, set_IdLiveStream] = useState<string>('');

  const [countView, setCountView] = useState<number>(0);

  const [isLiveStream, setIsLiveStream] = useState<boolean>(false);

  const router = useRouter();

  const [listMessage, setListMessage] = useState<Imessage[]>([]);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    //return () => {};
  }, [listMessage]);

  const { _id, name, accessToken } = useAppSelector((state) => state.account);

  if (!_id) {
    router.push('/auth');
  }

  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    const getLiveStream = async () => {
      const liveStream = await sendRequest<IBackendRes<any>>({
        method: 'GET',
        url: 'http://localhost:4000/livestream/client-get-livestream',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (liveStream?.data?.length > 0) {
        const _id = (await liveStream?.data?.length) > 0 ? await liveStream?.data[0]?._id : '';
        const newListMassage =
          liveStream?.data[0]?.messages?.map((item: any) => {
            //console.log(item);
            return {
              name: item.nameSender,
              massage: item.content,
              role: item.sender,
            };
          }) ?? [];

        setListMessage([...newListMassage]);
        console.log(`newListMassage:`, newListMassage);

        if (_id !== '') {
          set_IdLiveStream(_id);
          setIsLiveStream(true);
        }
      }
    };

    getLiveStream();
  }, [_idLiveStream, isLiveStream]);

  // connect stream
  useEffect(() => {
    console.log('_idLiveStream   ', _idLiveStream);

    if (_idLiveStream !== '') {
      console.log('_idLiveStream   ', _idLiveStream);
      const peer = new Peer(_id as string);

      peer.on('open', (id) => {
        socket.emit('client-join-stream', { viewerId: id });
      });

      peer.on('call', (call) => {
        // Khi có cuộc gọi đến

        call.answer(); // Trả lời cuộc gọi với stream rỗng
        call.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream; // Gán remote stream vào video element
          }
        });
      });

      peerInstance.current = peer;

      return () => {
        peer.destroy();

        //socket.disconnect();
      };
    }
  }, [_id, _idLiveStream]);

  useEffect(() => {
    socket.on('end-livestream', () => {});

    const handleBeforeUnload = () => {
      // Gửi sự kiện rời khỏi stream
      socket.emit('client-leave-stream', { viewerId: _id });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    setIsLiveStream(false);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [_id]);

  const handleSendMessageLiveStream = async ({ message }: { message: string }) => {
    const sendMessageChatLiveStream = await sendRequest({
      url: `http://localhost:4000/livestream/message/${_idLiveStream}`,
      method: 'POST',
      body: {
        senderId: _id,
        sender: 'customer',
        nameSender: name,
        content: message,
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    sendMessageChatLiveStream;

    socket.emit('client-chat', { message, name, role: 'client' });
  };

  const handleSetMessage = ({ massage }: { massage: string }) => {
    const newMessage: Imessage = {
      name: name!,
      massage: massage,
      role: 'customer',
    };
    setListMessage((prev: Imessage[]) => [...prev, newMessage]);
  };

  useEffect(() => {
    socket.on('chat-all', (e) => {
      console.log(e);
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

  return (
    <div className="  pt-4  overflow-x-hidden overflow-y-hidden  max-lg:pt-[20px]">
      {isLiveStream ? (
        <div className=" lg:px-16  pt-20  overflow-x-hidden max-lg:px-3 max-lg:pt-[136px]">
          <div className="count mb-4 ">
            <div className="viewer flex gap-3">
              <span>Số Người Xem : </span>
              <span>{countView} người</span>
            </div>
          </div>
          <div className="flex xl:justify-between xl:items-center max-lg:flex-col gap-3 w-full  ">
            {/* video */}
            <div className="basis-8/12  ">
              <video className="w-full h-full " ref={remoteVideoRef} id="videoplayer" autoPlay muted></video>
            </div>

            {/* message */}
            <div className="basis-4/12 h-full  rounded-md bg-white py-2 px-2">
              <div className="message h-[500px] max-h-[450px] max-lg:max-h-[300px] max-md:max-h-[450px] overflow-y-auto max-lg:text-xs text-base">
                {listMessage.map((item: Imessage, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex justify-start items-center w-full  gap-4 text-xs max-lg:text-sm mb-1
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

              <div className="chat  h-1/6  flex justify-center items-center  gap-3 relative w-full py-2">
                <InputChatLiveStreamForm
                  handleSetMessage={handleSetMessage}
                  handleSendMessageLiveStream={handleSendMessageLiveStream}
                ></InputChatLiveStreamForm>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <BackGroundLiveStream>
          <div className="w-full h-full text-center text-2xl mt-6">LiveStream Đã Kết Thúc.</div>
          <div className="w-full h-full text-center text-2xl mt-6">Hẹn Gặp Lại Các Bạn.</div>
        </BackGroundLiveStream>
      )}
    </div>
  );
};

export default LiveStream;
