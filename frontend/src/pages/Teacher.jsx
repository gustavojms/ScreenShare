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
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <body className="flex">
      <div className="h-screen pl-32 bg-white flex items-center justify-center flex-col left-1/2 transform -translate-x-1/2">
        <button className=" m-2 text-gray-400 hover:text-blue-500 font-bold py-2 px-4 rounded">
          <AiFillHome size={30}/>
        </button>
        <button className="m-2  text-gray-400 hover:text-blue-500 font-bold py-2 px-4 rounded">
          <BsCameraVideo size={30}/>
        </button>
        <button className="text-3xl m-2 text-gray-400 hover:text-blue-500 font-bold py-2 px-4 rounded">
          <FontAwesomeIcon icon={faCommentDots}/>
        </button>
      </div>
      <div className="border-2 border-gray-300 rounded-2xl h-screen w-screen relative">
        <div className="flex justify-center items-center m-4">
          <button className="bg-slate-300 p-2 text-gray-500 hover:bg-gray-400 mr-4 rounded">
            <IoMdArrowDropleft />
          </button>
          <h1 className="font-semibold text-3xl">Introdução a Programação</h1>
        </div>
        <div className="flex justify-end mr-14">
          <button onClick={startScreenShare} className="bg-gray-200 hover:bg-gray-300 p-2 text-blue-400 font-semibold rounded-lg">Start Sharing</button>
        </div>
        <div className="flex justify-center items-center h-screen">
          <video ref={videoRef} autoPlay>
          </video>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <button onClick={stopScreenShare} className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded">
            <MdCallEnd className="" size={30} />
          </button>
        
        </div>
      </div>
      <div className="bg-gray-200 pr-72">chat</div>
    </body>
      </>
    );
  };
  
  
export default Teacher;