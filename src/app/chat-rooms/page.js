'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ChatRooms() {
  const roomref = useRef(null);
  const router = useRouter();
  
  const handleJoinRoom = async(e) => {
    e.preventDefault();
    const room = roomref.current.value;
    if (room){
      try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${apiUrl}/api/rooms/${room}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data){
          router.push(`/chat/${room}`);
        }
      } catch (error) {
        console.error('Error while finding room:', error);
      }

    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Join a Chat Room</h2>
      <form onSubmit={handleJoinRoom} className="text-center">
        <div className="mb-3">
          <label className="form-label">Room Name</label>
          <input 
            type="text" 
            ref={roomref}
            className="form-control" 
          />
        </div>
        <button type="submit" className="btn btn-primary">Join Room</button>
      </form>
    </div>
  );
}
