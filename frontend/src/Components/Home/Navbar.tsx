import React from "react";

export default function Navbar({ fixed=true }) {
  return (
      <nav className="flex items-center justify-between flex-wrap p-6 bg-black shadow" >
        <div className="flex items-center flex-shrink-0 text-gray-400 mr-6 lg:mr-72">
          <h1 className="font-bold text-lg">ScreenShare</h1>
        </div>   
   </nav>
  );
}