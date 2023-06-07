import React, { useEffect, useRef, useState } from 'react';

function Salas({ socket }) {
  const [salasAtivas, setSalasAtivas] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('active', (salas) => {
        setSalasAtivas(salas);
      });
    }

    return () => {
      if (socket) {
        socket.off('active');
      }
    };
  }, [socket]);

  const handleSalaClicada = (sala) => {
    socket.emit('leave room');
    socket.emit('join room', sala);
  };

  return (
    <div>
      <h1>Salas ativas</h1>
      <ul>
        {salasAtivas.map((sala, index) => (
          <li key={index} onClick={() => handleSalaClicada(sala)}>
            {sala}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Salas;