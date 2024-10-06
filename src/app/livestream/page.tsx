'use client';

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useAppSelector } from '@/lib/redux/hooks';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';

//function addVideoStream(video: any, stream: any) {
//  video.srcObject = stream;
//  //video.addEventListener('loadedmetadata', () => {
//  //  video.play();
//  //});
//}

const LiveStream = () => {
  const router = useRouter();

  const { _id } = useAppSelector((state) => state.account);

  if (!_id) {
    router.push('/auth');
  }

  const [peerId, setPeerId] = useState<string>('');
  const [remotePeerId, setRemotePeerId] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);

  const socket = io(`http://localhost:5001`);

  useEffect(() => {
    const peer = new Peer(_id as string);

    peer.on('open', (id) => {
      socket.emit('client-join-stream', { viewerId: id });
    });

    peer.on('call', (call) => {
      // Khi có cuộc gọi đến
      //navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      //  //call.answer(stream); // Trả lời cuộc gọi bằng stream của mình
      //  call.answer(); // Trả lời cuộc gọi bằng stream của mình
      //  call.on('stream', (remoteStream) => {
      //    if (remoteVideoRef.current) {
      //      console.log('onstream');

      //      remoteVideoRef.current.srcObject = remoteStream; // Gán remote stream vào video element
      //    }
      //  });
      //});

      const emptyStream = new MediaStream(); // Tạo một stream rỗng
      call.answer(); // Trả lời cuộc gọi với stream rỗng
      call.on('stream', (remoteStream) => {
        if (remoteVideoRef.current) {
          console.log(`remoteVideoRef.current:`, remoteVideoRef.current);
          console.log('check');
          console.log(remoteStream);

          remoteVideoRef.current.srcObject = remoteStream; // Gán remote stream vào video element
          //remoteVideoRef.current.srcObject = remoteStream; // Gán remote stream vào video element
        }
      });
    });

    peerInstance.current = peer;

    return () => {
      peer.destroy();
      //socket.close();
    };
  }, [_id]);

  return (
    <div className="pt-28">
      <h1>Client</h1>
      <div>
        {/*<video
          className="border-2 border-blue-500 w-[500px] h-[400px] p-2"
          ref={remoteVideoRef}
          autoPlay
          playsInline
        ></video>*/}

        <video
          className="border-2 border-blue-500 w-[500px] h-[400px] p-2"
          ref={remoteVideoRef}
          id="videoplayer"
          autoPlay
          muted
        ></video>
      </div>
      <input
        type="text"
        placeholder="Remote Peer ID"
        value={remotePeerId}
        onChange={(e) => setRemotePeerId(e.target.value)}
      />
    </div>
  );
};

export default LiveStream;
