/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useAppSelector } from '@/lib/redux/hooks';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';

import { Button } from '@/components/ui/button';
import { CreateLiveStreamForm, CreateLiveStreamFormSchema } from '@/components/admin/form/CreateLiveStream';
import { z } from 'zod';
import { sendRequest } from '@/utils/fetchApi';
import { InputChatLiveStreamForm } from '@/components/admin/form/FormInputLiveStream';
import { apiLiveStream, listApi_Nest_Server_API_Route } from '@/utils/listApi';

export interface Imessage {
  name: string;
  massage: string;
  role: string;
}

//const socket = io(`http://localhost:5001`);
const socket = io(apiLiveStream, {
  //transports: ['websocket'], // Chỉ sử dụng WebSocket
  path: '/ws2',
  //path: '/ws2/ws2',
});

const LiveStream = () => {
  const [countView, setCountView] = useState<number>(0);

  const [listMessage, setListMessage] = useState<Imessage[]>([]);

  const [_idLiveStream, set_idLiveStream] = useState<string>('');

  const router = useRouter();

  //const [message, setMessage] = useState<string>('');

  const messageEndRef = useRef<HTMLDivElement>(null);

  //useEffect(() => {
  //  const handleEndLiveWhenUnLoad = () => {
  //    socket.emit('employee-unload', 'unload');
  //  };
  //  window.addEventListener('beforeunload', handleEndLiveWhenUnLoad);
  //  return () => {
  //    window.removeEventListener('beforeunload', handleEndLiveWhenUnLoad);
  //  };
  //}, []);

  useEffect(() => {
    const handleEndLiveWhenUnLoad = () => {
      const url = listApi_Nest_Server_API_Route.adminEndLiveStream();
      const data = new Blob(['unload'], { type: 'text/plain' });
      navigator?.sendBeacon(url, data); // Gửi dữ liệu ngay cả khi trang bị đóng
    };

    window.addEventListener('beforeunload', handleEndLiveWhenUnLoad);

    return () => {
      window.removeEventListener('beforeunload', handleEndLiveWhenUnLoad);
    };
  }, []);

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

  const userVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    socket.on('Admin-reciever-client', (viewerId) => {
      // gọi tới client sau khi server gửi viewerId của client
      navigator?.mediaDevices?.getUserMedia({ video: { width: 1280, height: 720 }, audio: true })?.then((stream) => {
        const call = peerInstance.current?.call(viewerId.viewerId, stream);
        call?.on('stream', (remoteStream) => {});
      });
    });

    return () => {};
  }, []);

  useEffect(() => {
    if (_idLiveStream.length > 0) {
      navigator?.mediaDevices?.getUserMedia({ video: { width: 1280, height: 720 }, audio: true })?.then((stream) => {
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
      });
    }

    return () => {};
  }, [_idLiveStream]);

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

  const handleSendMessageLiveStream = async ({ message }: { message: string }) => {
    const sendMessageChatLiveStream = await sendRequest({
      url: listApi_Nest_Server_API_Route.employeeSendMessageLiveStream(_idLiveStream),
      method: 'POST',
      body: {
        senderId: _id,
        sender: 'employee',
        nameSender: name,
        content: message,
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log('sendMessageChatLiveStream : ', sendMessageChatLiveStream);

    socket.emit('client-chat', { message, name, role: 'employee' });
    console.log(message);
  };

  // create livestream
  async function createLiveStream(title: z.infer<typeof CreateLiveStreamFormSchema>) {
    const livestream = await sendRequest<IBackendRes<any>>({
      url: listApi_Nest_Server_API_Route.adminCreateLiveStream(),
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: {
        employeeId: _id,
        nameEmployee: name,
        title: title.livestream,
      },
    });

    if (livestream.statusCode === 201) {
      set_idLiveStream(livestream.data._id);
    }
  }

  const handleEndLiveStream = async () => {
    const liveStream = await sendRequest<IBackendRes<any>>({
      method: 'GET',

      url: listApi_Nest_Server_API_Route.adminEndLiveStreamDetail(_idLiveStream),
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(liveStream);

    window.location.reload();
  };

  const handleSetMessage = ({ massage }: { massage: string }) => {
    const newMessage: Imessage = {
      name: name!,
      massage,
      role: 'employee',
    };
    setListMessage((prev: Imessage[]) => [...prev, newMessage]);
  };

  return (
    <>
      {_idLiveStream.length > 0 ? (
        <div>
          <div className="title text-xs max-lg:text-sm flex items-center gap-4 my-2">
            <p className=" text-xs max-lg:text-sm">Số Người Xem: {countView} người</p>
            <Button className="h-6" onClick={handleEndLiveStream}>
              Kết Thúc
            </Button>
          </div>

          <div className="flex xl:justify-between xl:items-center max-lg:flex-col gap-3 w-full  ">
            <div className="basis-8/12  ">
              <video className=" w-full h-full " ref={userVideoRef} autoPlay playsInline></video>
            </div>

            <div className="basis-4/12 h-full  rounded-md">
              <div className="message h-[500px] max-h-[450px] max-lg:max-h-[300px] max-md:max-h-[450px] overflow-y-auto text-xs max-lg:text-sm">
                {listMessage?.length > 0 &&
                  listMessage.map((item: Imessage, index) => {
                    console.log(item);

                    return (
                      <div
                        key={index}
                        className={`flex justify-start items-center  gap-4 text-xs max-lg:text-sm mb-1
                ${item.role === 'employee' ? 'text-red-500' : 'text-black'}
                `}
                      >
                        <div className="author">
                          <p>
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
        <div className="createLiveStream">
          <CreateLiveStreamForm onSubmit={createLiveStream}></CreateLiveStreamForm>
        </div>
      )}
    </>
  );
};

export default LiveStream;
