'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatRoom from '../../../components/ChatRoom';
import ChatSidebar from '../../../components/ChatSidebar';

export default function Chat({ params }) {
  const [socket, setSocket] = useState(null);
  const { room } = params;

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const socket = io(apiUrl, {
      withCredentials : true,
      auth:{
        token : localStorage.getItem('token')
      }
    });
    socket.emit('joinRoom', room);
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [room]);

  return (
    <div className="chat-container d-flex">
      <ChatSidebar currentRoom={room} />
      {socket ? <ChatRoom socket={socket} room={room} /> : <div>Loading...</div>}
    </div>
  );
}
