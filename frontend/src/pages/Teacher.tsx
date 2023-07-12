import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import "../index.css";
import ChatComponent from "../Components/ChatComponent";
import Salas from "../Components/Salas";
import { isMobileOnly } from "react-device-detect";
import { CameraIcon, PhoneXMarkIcon, PlusCircleIcon, TvIcon } from '@heroicons/react/24/outline'
import lookingForImg from "../assets/../assets/Business team looking for new people.png";

const Teacher: React.FC = () => {
  const worker = useRef<Worker | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [frame, setFrame] = useState<string>(lookingForImg);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const socket = useRef<Socket | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [deviceOrientation, setDeviceOrientation] = useState<number>(window.orientation || 0);
  const name = sessionStorage.getItem("name") || "";

  useEffect(() => {
    function handleOrientationChange() {
      setDeviceOrientation(window.orientation || 0);
    }

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://192.168.0.113:3000");
      setIsConnected(true);
    }
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("frame", (receivedFrame: string) => {
        setFrame(receivedFrame);
      });

      socket.current.on("users", (users: any) => {
        console.log(users);
      });

      return () => {
        console.log("desconectou");
        socket.current?.off("frame");
      };
    }
  }, []);

  async function startScreenShare() {
    let shouldContinue: boolean | undefined;
    socket.current?.emit("leave room")
    socket.current?.emit("create room", roomName, (ok: boolean) => {
      shouldContinue = ok;
    });

    await new Promise<void>((res) => {
      const i = setInterval(() => {
        if (shouldContinue !== undefined) {
          clearTimeout(i);
          res();
        }
      }, 1);
    });

    if (!shouldContinue) {
      alert("deu merda");
      return;
    }

    setIsButtonHidden(true);
    setShowVideo(true);
    setIsSending(true);
    socket.current!.emit("join room", roomName, name);

    const WIDTH = 1920;
    const HEIGHT = 1080;
    const newStream = await navigator.mediaDevices.getDisplayMedia();

    setStream(newStream);
    videoRef.current!.srcObject = newStream;

    const canvas = document.createElement("canvas");
    canvas.width = screen.width;
    canvas.height = screen.height;
    const context = canvas.getContext("2d", { willReadFrequently: true })!;

    worker.current = new Worker("worker.js");
    worker.current.onmessage = () => {
      captureAndSendFrame();
    };

    function captureAndSendFrame() {
      context.drawImage(videoRef.current!, 0, 0, WIDTH, HEIGHT);
      const imageDataURL = canvas.toDataURL("image/webp", 0.8);
      socket.current?.volatile.emit("frame", imageDataURL);
    }
  }

  function stopScreenShare() {
    setIsButtonHidden(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (stream && stream.getTracks!) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      worker.current!.terminate();
      console.log("finished?");
    }

    if (socket.current) {
      socket.current.emit("leave room");
      console.log("saiu");
    }

    setShowVideo(false);
    setFrame(lookingForImg);
    setIsSending(false);
    setRoomName("");
  }

  const takeScreenShot = () => {
    const imageElement = document.getElementById("frame") as HTMLImageElement;
    const canvas = document.createElement("canvas");
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
    const context = canvas.getContext("2d");
    context?.drawImage(imageElement, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const screenshotURL = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = screenshotURL;
      link.download = "screenshot.png";
      link.click();
      URL.revokeObjectURL(screenshotURL);
    });
  };
  

  

  return (
    <div className="sm:overflow-hidden sm:max-h-screen">
      <div className={`bg-slate-300 flex ${isMobileOnly ? `orientation-${deviceOrientation}` : ""}`}>
        <div className="flex flex-col">
          <Salas socket={socket.current}/>
        </div>
        <div className="border-2 border-gray-300 h-screen w-screen  rounded bg-gray-100 relative">
          <div className="flex justify-center items-center m-4">
            <div className="flex justify-end ml-5">
              <input
                className={`border border-gray-300 rounded-lg px-12 mr-2 font-semibold focus:outline-none focus:border-blue-500 ${
                  isMobileOnly ? "text-lg" : "text-lg"
                } text-center`}
                placeholder="Digite o nome da sala"
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <button className="inline-flex bg-blue-500 w-52 rounded" onClick={startScreenShare}>
                <span                
                  className="p-2"
                >
               <PlusCircleIcon className="h-10 w-10 text-white"/>               
              </span> 
              <p className="sm:text-2xl mt-3 pl-1 text-white font-bold justify-center">Transmitir</p>
            </button>
              </div>            
          </div>
          <div className="flex justify-center items-center m-2">
            {frame && !showVideo && <img id="frame" src={frame} alt="Received Frame"  className="mt-5"/>}

            {showVideo && <video ref={videoRef} autoPlay className="rounded-lg" />}
          </div> 
          {(isSending || frame!=lookingForImg) ? 
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 transform bg-transparent">
            <div className="flex">
              <div className="">
              <button className="m-2 cursor-pointer content-center rounded-lg bg-blue-500 p-3 text-white" onClick={takeScreenShot}>
                <CameraIcon className="h-8 w-8 bg-blue-500" />
              </button>
            </div>
            <div className="">
              <button onClick={stopScreenShare} className="m-2 cursor-pointer content-center rounded-lg bg-red-500 p-3 text-white">
                <PhoneXMarkIcon className="h-8 w-8 bg-red-500" />
              </button>
            </div>
            </div>
          </div> : <div className="text-center"><h1 className="text-lg font-bold">Entre em uma sala ou comece a compartilhar a tela!</h1></div>
          }
        </div>
        <div>
          {(isSending  || frame!=lookingForImg) && <ChatComponent socket={socket.current} />}
        </div>        
      </div>
      </div>
    
  );
};

export default Teacher;
