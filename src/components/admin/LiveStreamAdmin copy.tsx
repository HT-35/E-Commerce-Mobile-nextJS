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
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
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
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        setStream(stream);
        const call = peerInstance.current?.call(viewerId.viewerId, stream);
        call?.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
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

    // nhận cuộc gọi và trả lời
    peer.on('call', (call) => {
      // Khi có cuộc gọi đến
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        call.answer(stream); // Trả lời cuộc gọi bằng stream của mình
        call.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) {
            console.log('onstream');

            remoteVideoRef.current.srcObject = remoteStream; // Gán remote stream vào video element
          }
        });
      });
    });

    peerInstance.current = peer;

    return () => {
      peer.destroy();
    };
  }, [_id]);

  // gọi đi và nhận lại câu trả lời
  const callPeer = (remotePeerId: string) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      const call = peerInstance.current?.call(remotePeerId, stream);
      call?.on('stream', (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
    });
  };

  return (
    <div>
      <h1>PeerJS Video Call</h1>
      <div>
        <video
          className="border-2 border-red-500 w-[200px] h-[200px] p-6"
          ref={userVideoRef}
          autoPlay
          playsInline
        ></video>
        <video ref={remoteVideoRef} autoPlay playsInline></video>
      </div>
      <input
        type="text"
        placeholder="Remote Peer ID"
        value={remotePeerId}
        onChange={(e) => setRemotePeerId(e.target.value)}
      />
      <button className="w-4 h-4 m-4" onClick={() => callPeer(remotePeerId)}>
        Call
      </button>
      <p>Your ID: {peerId}</p>
    </div>
  );
};

export default LiveStream;
