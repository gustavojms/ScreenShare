import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const Student = () => {
    const videoRef = useRef(null);
    const socket = useRef(null);
    const pc = useRef(null);
  
    const startReceive = async () => {
      pc.current = new RTCPeerConnection();
      pc.current.addTransceiver("video", { direction: "recvonly" });
  
      pc.current.onicecandidate = event => {
        if (event.candidate) {
          socket.current.emit('candidate', event.candidate);
        }
      };
  
      pc.current.ontrack = event => {
        videoRef.current.srcObject = event.streams[0];
      };
  
      const offer = await pc.current.createOffer();
      await pc.current.setLocalDescription(offer);
      socket.current.emit('offer', offer);
    };
  
    useEffect(() => {
      socket.current = io("http://localhost:3000");
  
      socket.current.on('answer', async (answer) => {
        console.log(answer);
        await pc.current.setRemoteDescription(answer);
      });
  
      socket.current.on('candidate', async (candidate) => {
        await pc.current.addIceCandidate(candidate);
      });
  
      return () => {
        if (pc.current) {
          pc.current.close();
          pc.current = null;
        }
  
        if (socket.current) {
          socket.current.close();
          socket.current = null;
        }
      };
    }, []);
  
    return (
      <>
        <h1>Student</h1>
        <button onClick={startReceive}>Start Receive</button>
        <button>Capture</button>
        <video ref={videoRef} autoPlay></video>
      </>
    );
  };
  
  export default Student;