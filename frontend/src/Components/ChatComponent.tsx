import React, { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface ChatComponentProps {
  socket: Socket<any, any> | null;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ socket }) => {
  const messagesRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if(socket)
    socket.on('message', (msg: string, id: string, name: string) => {
      const chatMessage = document.createElement('div');
      const userName = document.createElement('div');
      const userMessage = document.createElement('div');

      userName.textContent = name;
      userMessage.textContent = msg;

      chatMessage.appendChild(userName)
      chatMessage.appendChild(userMessage)
      console.log(name);

      chatMessage.className = 'flex flex-col chat chat-start'
      userName.className = 
        id === socket.id
        ? 'w-full flex justify-end text-sm text-gray-500 capitalize'
        : 'w-full flex justify-start text-sm text-gray-500 capitalize'
      userMessage.className = 
        id === socket.id
          ? 'justify-end flex bg-blue-500 rounded-lg p-2 text-white mb-2 chat-bubble'
          : 'justify-start flex bg-gray-200 rounded-lg p-2 pr-2 mb-2 chat-bubble';

      messagesRef.current?.appendChild(chatMessage);
      messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
    });

    return () => {
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
    <div className="overflow-hidden sm:max-w-md mx-auto bg-white rounded-lg shadow-md p-4 flex flex-col h-full sm:h-screen w-48 sm:w-80">
      <div className='inline-flex justify-center m-2'> 
        <ChatBubbleLeftRightIcon className='h-9 w-9'/>        
        <h1 className="pl-2 text-center text-3xl font-bold text-black shadow-blue-600/100 drop-shadow-md">Chat</h1>
        
      </div>
      <hr className='mb-2'/>           
      <ul id="messages" ref={messagesRef} className="mb-4 flex-grow overflow-y-auto"></ul>
      <form id="form" onSubmit={handleSubmit} className="flex">
        <input
          id="input"
          autoComplete="off"
          className="flex-grow w-20 mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
          <button type="submit" className=''>
            <PaperAirplaneIcon className="h-10 w-10 rounded p-2 text-white bg-blue-500" />
          </button>    
      </form>
    </div>
  );
};

export default ChatComponent;
