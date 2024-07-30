'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ChatSidebar = ({ currentRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [newRoom, setNewRoom] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${apiUrl}/api/rooms`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(
        `${apiUrl}/api/rooms`,
        { name: newRoom },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
 
      setRooms([...rooms, { name: newRoom }]);
      router.push(`/chat/${newRoom}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div className="chat-sidebar">
      <div className="chat-sidebar-header d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-primary text-center" onClick={handleShow}>
          Create Room
        </button>
      </div>
      <ul className="list-group">
        {rooms.map((room, index) => (
          <li key={index} className={`list-group-item ${currentRoom === room.name ? 'active' : ''}`}>
            <Link href={`/chat/${room.roomId}`} className="text-decoration-none text-dark">
              {room.roomId}
            </Link>
          </li>
        ))}
      </ul>

      {show && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Room</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Room Name"
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleCreateRoom}>
                  Create Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {show && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default ChatSidebar;
