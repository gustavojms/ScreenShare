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
    if(socket) {
      socket.emit('leave room');
      socket.emit('join room', sala);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Salas ativas</h1>
      <ul className="flex flex-col items-center font-medium">
        {salasAtivas.map((sala, index) => (
          <li key={index} onClick={() => handleSalaClicada(sala)}>
            {sala}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Salas;
