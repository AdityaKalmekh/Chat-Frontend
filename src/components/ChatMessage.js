const ChatMessage = ({ message }) => {
  const username = message.author.split("@")[0];
  const date = new Date(message.timestamp);
  const hours = date.getHours(); 
  const minutes = date.getMinutes(); 
  const time = `${hours}:${minutes}`;
  return (
    <div className={`chat-message mb-3 text-end}`}>
      <div className={`d-inline-block p-2 rounded bg-light shadow card}`}>
        <div className="message-content">
          <strong>{username}</strong>
          <p className="mb-0">{message.content}</p>
          <small className="text-muted">{time}</small>
        </div>
      </div>
    </div>
  );
}
  
export default ChatMessage;  