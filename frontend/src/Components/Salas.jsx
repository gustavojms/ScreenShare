import React, { useEffect, useRef, useState } from 'react';

function Salas({ socket }) {
  const [salasAtivas, setSalasAtivas] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('active', (sala) => {
        setSalasAtivas((salas) => [...salas, sala]);
      });
    }

    return () => {
      if (socket) {
        socket.off('active');
      }
    };
  }, [socket]);

  return (
    <div>
      <h1>Salas ativas</h1>
      <ul>
        {salasAtivas.map((sala, index) => (
          <li key={index}>{sala}</li>
        ))}
      </ul>
    </div>
  );
}

export default Salas;
