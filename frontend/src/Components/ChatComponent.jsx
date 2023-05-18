import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

function ChatComponent() {
  const messagesRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on('message', (msg) => {
      const item = document.createElement('li');
      item.textContent = msg;
      messagesRef.current.appendChild(item);
    //   window.scrollTo(0, document.body.scrollHeight);
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socketRef.current.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.input;

    if (input.value) {

        console.log(input.value);
      socketRef.current.emit('message', input.value);
      input.value = '';
    }
  };

  return (
    <div>
      <ul id="messages" ref={messagesRef}></ul>
      <form id="form" onSubmit={handleSubmit}>
        <input id="input" autoComplete="off" />
        <button>Send</button>
      </form>
    </div>
  );
}

export default ChatComponent;
//