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

const LiveStream = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const router = useRouter();

  const isMounted = useScreen()?.isMounted ?? false;
  const [activeEmojiPicker, setActiveEmojiPicker] = useState(false);

  const { _id } = useAppSelector((state) => state.account);

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

  const handleActiveEmojiPicker = () => {
    console.log('activeEmojiPicker :  ', activeEmojiPicker);

    setActiveEmojiPicker((prv) => !prv);
  };

  const handleGetOnEmojiClick = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject);
    console.log(emojiObject.target);
  };

  return (
    <div className="flex xl:justify-between xl:items-center max-xl:flex-col gap-3 w-full h-full py-4">
      <div className="basis-8/12  ">
        <video className=" w-full h-full " ref={userVideoRef} autoPlay playsInline></video>
      </div>

      <div className="basis-4/12 h-full  rounded-md">
        <div className="message max-h-[450px] overflow-y-auto">
          <div className="flex justify-start items-center  gap-4">
            <div className="author">Huy Tran : </div>
            <div className="author">Hello, m có thấy t không</div>
          </div>

          {Array(50)
            .fill(null)
            .map((item, index) => {
              return (
                <div key={index} className="flex justify-start items-center  gap-4">
                  <div className="author">Huy Tran : </div>
                  <div className="author">Hello, m có thấy t không</div>
                </div>
              );
            })}
        </div>
        <div className="chat  h-1/6  flex justify-center items-center  gap-3 relative w-full">
          <div className="w-full">
            <Input placeholder="Nhập nội dung ..."></Input>
          </div>
          <EmojiPicker
            open={activeEmojiPicker}
            onEmojiClick={handleGetOnEmojiClick}
            skinTonesDisabled={false}
            searchDisabled={false}
            reactionsDefaultOpen={true}
            style={{
              position: 'absolute',
              bottom: '60px',
              right: '0px',
              zIndex: '9999',
            }}
          />
          <div className="icon relative w-[50px]" onClick={handleActiveEmojiPicker}>
            <SmileIcon></SmileIcon>
            {/*<div className="absolute">{activeEmojiPicker && <EmojiPicker />}</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;
