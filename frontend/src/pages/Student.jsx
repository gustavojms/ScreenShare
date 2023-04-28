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

const Student = () => {
    const videoRef = useRef(null);
    const socket = useRef(null);
    const pc = useRef(null);

    function takeScreenShot() {
      let canva = document.createElement("canvas");
      canva.width = videoRef.current.videoWidth;
      canva.height = videoRef.current.videoHeight;
      let ctx = canva.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canva.width, canva.height);
      let link = document.createElement('a');
      link.download = 'screenshot.png';
      link.href = canva.toDataURL("image/png");
      link.click();
    }
  
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
          <button onClick={startReceive} className="bg-gray-200 hover:bg-gray-300 p-2 text-blue-400 font-semibold rounded-lg">Start Receive</button>
        </div>
        <div className="flex justify-center items-center h-screen">
          <video ref={videoRef} autoPlay>
          </video>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <button className="bg-gray-300 hover:bg-gray-400 font-bold py-4 px-6 mr-2 text-white rounded">
            <FaExpand className="" size={30} />
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded">
            <MdCallEnd className="" size={30} />
          </button>
          <button onClick={takeScreenShot} className=" m-2 bg-gray-600 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded">
            <BiCamera className="" size={30} />
          </button>
        </div>
      </div>
      <div className="bg-gray-200 pr-72">chat</div>
    </body>
  );
};

export default Student;