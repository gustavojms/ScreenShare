import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function ChatComponent({ socket }) {
  const messagesRef = useRef(null);

  useEffect(() => {
    socket.on('message', (msg, id) => {
      const item = document.createElement('li');
      item.textContent = msg;
      console.log(id)

      item.className = id === socket.id ? 'justify-end flex bg-blue-500 rounded-lg shadow-md p-4 mb-4 text-white' : 'justify-start flex bg-gray-200 rounded-lg shadow-md p-4 mb-4'; // Add conditional classes for left and right messages
      messagesRef.current.appendChild(item);
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    });

    return () => {
      // Clean up the socket event listener when the component unmounts
      socket.off('message');
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.input;

    if (input.value) {
      socket.emit('message', input.value, socket.id);
      input.value = '';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 flex flex-col h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Chat</h1>
      <ul id="messages" ref={messagesRef} className="mb-4 flex-grow overflow-y-auto"></ul>
      <form id="form" onSubmit={handleSubmit} className="flex">
        <input
          id="input"
          autoComplete="off"
          className="flex-grow mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out text-white font-semibold px-4 py-2 rounded-md">
          Enviar
        </button>
      </form>
    </div>
  );
}

ChatComponent.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default ChatComponent;