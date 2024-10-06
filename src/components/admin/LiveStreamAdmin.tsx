/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useAppSelector } from '@/lib/redux/hooks';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';

const LiveStream = () => {
  const router = useRouter();

  const { _id } = useAppSelector((state) => state.account);

  if (!_id) {
    router.push('/auth');
  }

  const [peerId, setPeerId] = useState<string>('');
  const [remotePeerId, setRemotePeerId] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);

  const socket = io(`http://localhost:5001`);

  useEffect(() => {
    socket.on('Admin-reciever-client', (viewerId) => {
      console.log('');
      console.log('');
      console.log('');
      console.log('viewerId', viewerId);
      console.log('');
      console.log('');

      // gọi tới client sau khi server gửi viewerId của client

      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        setStream(stream);
        const call = peerInstance.current?.call(viewerId.viewerId, stream);
        call?.on('stream', (remoteStream) => {});
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
      });
    });

    return () => {
      //socket.close();
      //socket.off('Admin-reciever-client');
    };
  }, []);

  useEffect(() => {
    const peer = new Peer(_id as string);

    peer.on('open', (id) => {
      setPeerId(id);
      socket.emit('admin-Conect', { viewerId: id });
    });

    peerInstance.current = peer;

    return () => {
      peer.destroy();
    };
  }, [_id]);

  return (
    <div>
      <h1>Admin</h1>
      <div>
        <video
          className="border-2 border-red-500 w-[500px] h-[400px] p-2"
          ref={userVideoRef}
          autoPlay
          playsInline
        ></video>
      </div>

      <p>Your ID: {peerId}</p>
    </div>
  );
};

export default LiveStream;
