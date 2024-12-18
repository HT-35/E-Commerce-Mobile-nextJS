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
import { apiLiveStream, listApi_Nest_Server_API_Route } from '@/utils/listApi';

const socket = io(apiLiveStream, {
  //transports: ['websocket'], // Chỉ sử dụng WebSocket
  path: '/ws2',
  //path: '/ws2/ws2',
});

const LiveStream = () => {
  const [_idLiveStream, set_IdLiveStream] = useState<string>('');
  const [countView, setCountView] = useState<number>(0);
  const [isLiveStream, setIsLiveStream] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true); // state để theo dõi âm thanh

  const router = useRouter();
  const [listMessage, setListMessage] = useState<Imessage[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const { _id, name, accessToken } = useAppSelector((state) => state.account);

  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);

  if (!accessToken) {
    router.push('/auth?callback=/livestream');
  }

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [listMessage]);

  useEffect(() => {
    const getLiveStream = async () => {
      const liveStream = await sendRequest<IBackendRes<any>>({
        method: 'GET',
        url: listApi_Nest_Server_API_Route.clientGetLiveStream(),
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (liveStream?.data?.length > 0) {
        const _id = liveStream?.data[0]?._id ?? '';
        const newListMassage =
          liveStream?.data[0]?.messages?.map((item: any) => {
            return {
              name: item.nameSender,
              massage: item.content,
              role: item.sender,
            };
          }) ?? [];
        setListMessage([...newListMassage]);
        if (_id !== '') {
          set_IdLiveStream(_id);
          setIsLiveStream(true);
        }
      }
    };
    getLiveStream();
  }, [_idLiveStream, accessToken, isLiveStream]);

  useEffect(() => {
    if (_idLiveStream !== '') {
      const peer = new Peer(_id as string);

      peer.on('open', (id) => {
        socket.emit('client-join-stream', { viewerId: id });
      });

      peer.on('call', (call) => {
        call.answer(); // Trả lời cuộc gọi
        call.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            // Kết nối âm thanh nếu cần
            let a: any = new Audio();
            a.muted = isMuted; // Dùng trạng thái isMuted để kiểm soát âm thanh
            a.srcObject = remoteStream;
            a.addEventListener('canplaythrough', () => {
              a = null;
            });
          }
        });
      });

      peerInstance.current = peer;
      return () => {
        peer.destroy();
      };
    }
  }, [_id, _idLiveStream, isMuted]);

  const handleToggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted); // Thay đổi trạng thái âm thanh
  };

  const handleSetMessage = ({ massage }: { massage: string }) => {
    const newMessage: Imessage = {
      name: name!,
      massage: massage,
      role: 'customer',
    };
    setListMessage((prev: Imessage[]) => [...prev, newMessage]);
  };

  const handleSendMessageLiveStream = async ({ message }: { message: string }) => {
    const sendMessageChatLiveStream = await sendRequest({
      url: listApi_Nest_Server_API_Route.clientSendMessageLiveStream(_idLiveStream),
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

  //  =================

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
    <div className="pt-4 overflow-x-hidden overflow-y-hidden">
      {isLiveStream ? (
        <div className="lg:px-16 pt-20">
          <div className="viewer flex gap-3">
            <span>Số Người Xem : </span>
            <span>{countView} người</span>
          </div>
          <div className="flex xl:justify-between xl:items-center max-lg:flex-col gap-3 w-full">
            <div className="basis-8/12 relative">
              <video
                className="w-full h-full"
                ref={remoteVideoRef}
                id="videoplayer"
                autoPlay
                muted={isMuted} // Điều khiển âm thanh qua muted
              ></video>
              <div className="absolute bottom-5 right-5">
                <button onClick={handleToggleMute} className="bg-white text-black p-3 rounded-xl">
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
              </div>
            </div>

            <div className="basis-4/12 h-full rounded-md bg-white py-2 px-2">
              <div className="message h-[500px] max-h-[450px] overflow-y-auto">
                {listMessage?.map((item: Imessage, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex justify-start items-center w-full gap-4 text-xs  ${item?.role === 'employee' ? 'text-red-500' : ''} `}
                    >
                      <div className="author">
                        <p>
                          {item?.name} {item?.role === 'employee' ? '(admin)' : ''}:
                        </p>
                      </div>
                      <div className="massage">{item?.massage}</div>
                    </div>
                  );
                })}
                <div ref={messageEndRef}></div>
              </div>
              <div className="chat h-1/6 flex justify-center items-center gap-3">
                {/*<InputChatLiveStreamForm />*/}

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

      {/*<div className="absolute bottom-5 right-5">
        <button
          onClick={handleToggleMute}
          className="bg-gray-800 text-white p-3 rounded-full"
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>*/}
    </div>
  );
};

export default LiveStream;
