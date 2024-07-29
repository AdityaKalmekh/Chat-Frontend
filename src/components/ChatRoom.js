import { useState, useEffect } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';

const ChatRoom = ({ socket, room }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:1337/api/messages?room=${room}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket, room]);

  const sendMessage = async () => {
    console.log(message);
    console.log(room);
    if (message) {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:1337/api/messages',
        { data: { content: message, room } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type' : 'application/json'
          },
        }
      );
      setMessage('');
    }
  };

  return (
    <div className="chat-room d-flex flex-column h-100">
      <div className="chat-messages flex-grow-1 p-3 overflow-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      <div className="chat-input d-flex p-3 border-top">
        <input
          type="text"
          className="form-control me-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
