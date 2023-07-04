import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Socket } from 'socket.io-client';

interface ChatComponentProps {
  socket: Socket<any, any> | null;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ socket }) => {
  const messagesRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if(socket)
    socket.on('message', (msg: string, id: string, name: string) => {
      const chatMessage = document.createElement('div');
      const userName = document.createElement('span');
      const userMessage = document.createElement('span');

      userName.textContent = name;
      userMessage.textContent = msg;

      chatMessage.appendChild(userName)
      chatMessage.appendChild(userMessage)
      // userMessage.textContent = `${name}: ${msg}`
      console.log(name);

      chatMessage.className = 'flex flex-col'
      userName.className = 
        id === socket.id
        ? 'w-full flex justify-end text-sm text-gray-500 capitalize'
        : 'w-full flex justify-start text-sm text-gray-500 capitalize'
      userMessage.className = 
        id === socket.id
          ? 'justify-end flex bg-blue-500 rounded-lg p-2 text-white'
          : 'justify-start flex bg-gray-200 rounded-lg p-2';

      // chatMessage.className =
      //   id === socket.id
      //     ? 'justify-end flex bg-blue-500 rounded-lg shadow-md p-2 mb-4 text-white'
      //     : 'justify-start flex bg-gray-200 rounded-lg shadow-md p-2 mb-4'; // Add conditional classes for left and right messages
      messagesRef.current?.appendChild(chatMessage);
      messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
    });

    return () => {
      // Clean up the socket event listener when the component unmounts
      if(socket)
      socket.off('message');
    };
  }, [socket]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('input') as HTMLInputElement;

    if (input.value && socket) {
      socket.emit('message', input.value, socket.id);
      input.value = '';
    }
  };

  return (
    <div className="sm:max-w-md mx-auto bg-white rounded-lg shadow-md p-4 flex flex-col h-96 sm:h-screen w-48 sm:w-96">
      <h1 className="text-2xl font-bold mb-4 text-center">Chat</h1>
      <ul id="messages" ref={messagesRef} className="mb-4 flex-grow overflow-y-auto"></ul>
      <form id="form" onSubmit={handleSubmit} className="flex">
        <input
          id="input"
          autoComplete="off"
          className="flex-grow w-20 mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button className="w-12 h-10 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out text-white font-semibold text-xs rounded-md">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
