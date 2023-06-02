import React, { useEffect, useRef, useState } from 'react';
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
import ChatComponent from '../Components/ChatComponent';


const Teacher = () => {
  let worker = useRef(null);
  let [stream, setStream] = useState(null);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const videoRef = useRef(null);
  const socket = useRef(null);
  const messagesRef = useRef(null);

  async function startScreenShare() {
    setIsButtonHidden(true);
    socket.current = io("http://localhost:3000");
    
    const WIDTH = 1920
    const HEIGHT = 1080
    const newStream = await navigator.mediaDevices.getDisplayMedia();

    setStream(newStream);
    videoRef.current.srcObject = newStream;

    const canvas = document.createElement('canvas');
    canvas.width = screen.width;
    canvas.height = screen.height;
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
        WIDTH,
        HEIGHT

      );
      const imageDataURL = canvas.toDataURL('image/webp', 0.8);
      socket.current.volatile.emit('frame', imageDataURL);
    }
  }

  function stopScreenShare() {
    setIsButtonHidden(false);
    videoRef.current.srcObject = null;
    if(stream && stream.getTracks) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    worker.current.terminate();
    console.log("finished?")
  }

  return (
    <>
      <div className="flex">
        <div className="h-screen pl-32 bg-white flex items-center justify-center flex-col left-1/2 transform -translate-x-1/2">
          <button className=" m-2 text-gray-400 hover:text-blue-500 font-bold py-2 px-4 rounded">
            <AiFillHome size={30} />
          </button>
          <button className="m-2  text-gray-400 hover:text-blue-500 font-bold py-2 px-4 rounded">
            <BsCameraVideo size={30} />
          </button>
          <button className="text-3xl m-2 text-gray-400 hover:text-blue-500 font-bold py-2 px-4 rounded">
            <FontAwesomeIcon icon={faCommentDots} />
          </button>
        </div>
        <div className="border-2 border-gray-300 rounded-2xl h-screen w-screen relative">
          <div className="flex justify-center items-center m-4">
            <button className="bg-slate-300 p-2 text-gray-500 hover:bg-gray-400 mr-5 rounded">
              <IoMdArrowDropleft />
            </button>
            <h1 className="font-semibold text-3xl">Introdução a Programação</h1>
            <div className="flex justify-end items-end ml-5">
              <button onClick={startScreenShare} hidden={isButtonHidden} className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out p-3 text-white font-semibold rounded-lg">Start Sharing</button>
            </div>
          </div>
          <div className="flex justify-center items-center m-2">
            <video ref={videoRef} autoPlay className='rounded-lg'>
            </video>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <button onClick={stopScreenShare} className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded">
              <MdCallEnd className="" size={30} />
            </button>

          </div>
        </div>
        <ChatComponent />
      </div>
    </>
  );
};


export default Teacher;