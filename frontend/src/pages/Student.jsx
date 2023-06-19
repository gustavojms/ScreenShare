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

const Student = () => {
  const [frame, setFrame] = useState("");
  const [isReceiving, setIsReceiving] = useState(false);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const [roomName, setRoomName] = useState(""); // Adicionado estado para o nome da sala
  const socket = useRef(null);
  const [activeStreams, setActiveStreams] = useState();
  const [deviceOrientation, setDeviceOrientation] = useState(window.orientation || 0);

  useEffect(() => {
    function handleOrientationChange() {
      setDeviceOrientation(window.orientation || 0);
    }
  
    window.addEventListener("orientationchange", handleOrientationChange);
  
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  function startReceive() {
    setIsReceiving(true);
    setIsButtonHidden(true);
    if (!socket.current) {
      socket.current = io("http://192.168.0.113:3000");
    } else {
      socket.current.connect();
    }

    socket.current.emit("join room", roomName, "student"); // nome de testes
    socket.current.on("frame", (receivedFrame) => {
      setFrame(receivedFrame);
    });
  }

  function stopReceive() {
    setIsReceiving(false);
    setIsButtonHidden(false);

    if (socket.current) {
      socket.current.emit("leave room")
      socket.current.off("frame");
      socket.current.disconnect();
      
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
  <body className={`flex ${isMobileOnly ? `orientation-${deviceOrientation}` : ""}`}>
        <div className="p-4 flex flex-col">
          <Salas socket={socket.current} />
        </div>
        <div className="border-2 border-gray-300 rounded-2xl h-screen w-screen relative">
          <div className="flex justify-center items-center m-4">
            <button className="bg-slate-300 p-2 text-gray-500 hover:bg-gray-400 mr-5 rounded">
              <IoMdArrowDropleft />
            </button>
            <div className="flex justify-end ml-5">
              <input
                className="border border-gray-300 rounded-lg p-1 mr-2 font-semibold text-3xl text-center"
                placeholder="Digite o nome da sala"
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <button
                onClick={startReceive}
                disabled={!roomName || isButtonHidden}
                className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out p-3 text-white font-semibold rounded-lg"
              >
                {" "}
                Start Receive{" "}
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center m-2">
            <img id="frame" src={frame} alt="" className="rounded-lg" />
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <button className="bg-gray-300 hover:bg-gray-400 font-bold py-4 px-6 mr-2 text-white rounded">
              <FaExpand className="" size={30} />
            </button>
            <button
              onClick={stopReceive}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded"
            >
              <MdCallEnd className="" size={30} />
            </button>
            <button
              onClick={takeScreenShot}
              className=" m-2 bg-gray-600 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded"
            >
              <BiCamera className="" size={30} />
            </button>
          </div>
        </div>
        {socket.current && <ChatComponent socket={socket.current} />}
      </body>
    </>
  );
};

export default Student;
