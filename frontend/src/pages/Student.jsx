import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "../index.css";
import { MdCallEnd } from "react-icons/md";
import { BiCamera } from "react-icons/bi";
import { IoMdArrowDropleft } from "react-icons/io";
import { FaExpand } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatComponent from "../Components/ChatComponent";
import Salas from "../Components/Salas";
import { isMobileOnly } from 'react-device-detect';


const Student = (name) => {
  const [frame, setFrame] = useState("");
  const [isReceiving, setIsReceiving] = useState(false);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const [roomName, setRoomName] = useState(""); // Adicionado estado para o nome da sala
  const socket = useRef(null);
  const [activeStreams, setActiveStreams] = useState();
  const [deviceOrientation, setDeviceOrientation] = useState(window.orientation || 0);
  const [isConnected, setIsConnected] = useState(false);

  // useEffect(() => {
  //   function handleOrientationChange() {
  //     setDeviceOrientation(window.orientation || 0);
  //   }
  
  //   window.addEventListener("orientationchange", handleOrientationChange);
  
  //   return () => {
  //     window.removeEventListener("orientationchange", handleOrientationChange);
  //   };
  // }, []);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://192.168.0.113:3000");
      setIsConnected(true);
    }
  }, []);

  useEffect(() => {
    if (socket.current) {

      socket.current.on("frame", (receivedFrame) => {
        setFrame(receivedFrame);
      });
      
      return () => {
        console.log("desconectou");
        socket.current?.off("frame");
      };
    }
  }, []);

   function startReceive() {
     setIsReceiving(true);
     setIsButtonHidden(true);
   
     socket.current.emit("join room", roomName, "student"); // nome de testes
    
  }

  function stopReceive() {
    setIsReceiving(false);
    setIsButtonHidden(false);

    if (socket.current) {
      socket.current.emit("leave room")
      // socket.current.disconnect();
      
    }

    setFrame(null);
  }

  const takeScreenShot = () => {
    const imageElement = document.getElementById("frame");
    const canvas = document.createElement("canvas");
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
    const context = canvas.getContext("2d");
    context.drawImage(imageElement, 0, 0);
    canvas.toBlob((blob) => {
      const screenshotURL = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = screenshotURL;
      link.download = "screenshot.png";
      link.click();
      URL.revokeObjectURL(screenshotURL);
    });
  };

  return (
    <>
       <div className={`flex ${isMobileOnly ? 'transform rotate-90 ' : ''}`}>
        <div className="sm:p-4 flex flex-col">
          <Salas socket={socket.current} />
        </div>
        <div className="border-2 border-gray-300 rounded-2xl h-96 sm:h-screen sm:w-screen relative">
          <div className="flex justify-center items-center m-4">
            <button className="bg-slate-300 p-2 text-gray-500 hover:bg-gray-400 mr-5 rounded">
              <IoMdArrowDropleft />
            </button>
            <div className="flex justify-end">
              <input
                className="text-xs sm:text-lg w-48 h-11 sm:h-14 sm:w-full border border-gray-300 rounded-lg p-1 mr-2 font-semibold text-center"
                placeholder="Digite o nome da sala"
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <button
                onClick={startReceive}
                disabled={!roomName || isButtonHidden}
                className="h-12 text-xs sm:h-14 sm:text-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out text-white font-semibold rounded-lg"
              >
                {" "}
                Start Receive{" "}
              </button>
            </div> 
          </div>
          <div className="flex justify-center items-center m-2">
            <img id="frame" src={frame} alt="" className="rounded-lg" />
          </div>
          <div className="flex justify-center items-center">
            <button className="bg-gray-300 hover:bg-gray-400 font-bold py-1 px-2 sm:py-2 sm:px-4 mr-2 text-white rounded">
              <FaExpand className="" size={20} />
            </button>
            <button
              onClick={stopReceive}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded text-base"
            >
              <MdCallEnd className="" size={20} />
            </button>
            <button
              onClick={takeScreenShot}
              className=" m-2 bg-gray-600 hover:bg-gray-800 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded"
            >
              <BiCamera className="" size={20} />
            </button>
          </div>
        </div>
        {isReceiving && <ChatComponent socket={socket.current} />}
      </div>
    </>
  );
};

export default Student;
