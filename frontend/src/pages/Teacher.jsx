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
  let stream = null;
  let worker = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:3000");

    return () => {
      socket.current.off('frame');
    };
  }, []);

  async function startScreenShare() {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        width: { max: 1024 },
        height: { max: 768 },
      },
    });

    videoRef.current.srcObject = stream;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const context = canvas.getContext('2d', { willReadFrequently: true });

    worker.current = new Worker('worker.js');
    worker.current.onmessage = () => {
      captureAndSendFrame();
    };

    function captureAndSendFrame() {
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvas.width,
        canvas.height
      );
      const imageDataURL = canvas.toDataURL('image/webp', 0.8);
      socket.current.emit('frame', imageDataURL);
    }
  }

  function stopScreenShare() {
    videoRef.current.srcObject = null;
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }
  
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