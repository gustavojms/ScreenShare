import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import '../index.css'
import { MdCallEnd } from 'react-icons/md'
import { BiCamera } from 'react-icons/bi'
import { IoMdArrowDropleft } from 'react-icons/io';
import { FaExpand } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { BsCameraVideo } from 'react-icons/bs';
import { FaComment } from 'react-icons/fa';

const Teacher = () => {
    const videoRef = useRef(null);
    const socket = useRef(null);
    let stream = useRef(null);
    let pc = useRef(null);
  
    useEffect(() => {
      socket.current = io("http://localhost:3000");
  
      socket.current.on('offer', async (offer) => {
        pc.current = new RTCPeerConnection();
        stream.current.getTracks().forEach(track => pc.current.addTrack(track, stream.current));
  
        pc.current.onicecandidate = event => {
          if (event.candidate) {
            event.candidate.usernameFragment = null;
            console.log("candidate");
            socket.current.emit('candidate', event.candidate);
          }
        };
  
        await pc.current.setRemoteDescription(offer);
        const answer = await pc.current.createAnswer();
        await pc.current.setLocalDescription(answer);
        socket.current.emit('answer', answer);
        console.log(offer);
      });
  
      socket.current.on('candidate', async (candidate) => {
        console.log("candidate");
        await pc.current.addIceCandidate(candidate);
      });
  
      return () => {
        if (pc.current) {
          pc.current.close();
          pc.current = null;
        }
  
        if (stream.current) {
          stream.current.getTracks().forEach(track => track.stop());
          stream.current = null;
        }
  
        if (socket.current) {
          socket.current.close();
          socket.current = null;
        }
      };
    }, []);
  
    const startScreenShare = async () => {
      stream.current = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { max: 720 },
          height: { max: 480 }
        }
      });
      videoRef.current.srcObject = stream.current;
    };
  
    const stopScreenShare = () => {
      if (pc.current) {
        pc.current.close();
        pc.current = null;
      }
  
      if (stream.current) {
        stream.current.getTracks().forEach(track => track.stop());
        stream.current = null;
      }
  
      videoRef.current.srcObject = null;
    };
  
    return (
        <>
        <h1>Teacher</h1>
        <div>
          <button onClick={startScreenShare}>Start Sharing</button>
          <button onClick={stopScreenShare}>Stop Sharing</button>
        </div>
        <video ref={videoRef} autoPlay></video>
      </>
    );
  };
  
  
export default Teacher;