import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

interface SalasProps {
  socket: Socket<any, any> | null;
}

const Salas: React.FC<SalasProps> = ({ socket }) => {
  const [salasAtivas, setSalasAtivas] = useState<string[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on('active', (salas: string[]) => {
        setSalasAtivas(salas);
      });
    }

    return () => {
      if (socket) {
        socket.off('active');
      }
    };
  }, [socket]);

  const handleSalaClicada = (sala: string) => {
    if (socket) {
      socket.emit('leave room');
      socket.emit('join room', sala);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-base sm:text-2xl font-bold text-center">Salas ativas</h1>
      <div className="max-h-full overflow-y-auto">
        <ul className="flex flex-col justify-center items-center font-medium text-white">
          {salasAtivas.map((sala, index) => (
            <li
              key={index}
              onClick={() => handleSalaClicada(sala)}
              className="m-1 h-8 w-24 sm:h-12 sm:w-32 bg-gray-900 flex flex-col justify-center items-center text-center rounded-md cursor-pointer hover:bg-gray-700"
            >
              {sala}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Salas;
