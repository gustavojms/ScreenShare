import React from "react";
import imghome from "../../assets/Bannerregister.jpeg";
import {useNavigate } from "react-router-dom";

export default function Main() {

    const navigate = useNavigate();

    const handleSubmit = (event:any) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        sessionStorage.setItem("name", name);
        navigate("/Teacher");
    };

    
    return (
        <main>
            <div className="sm:flex"> 
           
                <div className="sm:w-1/2 sm:h-1/2 sm:inline-block w-fit h-fit">
                    
                    <img src={imghome} alt="Umas coisas coloridas" />
                </div>
                <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full sm:mt-48">
                    <form className="grid grid-cols-2 gap-4 max-w-xl m-auto" onSubmit={handleSubmit}>
                        <div className="col-span-2 lg:col-span-2">
                            <input type="text" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-lg" name="name" placeholder="Seu nome" />
                        </div>
                        <div className="col-span-2 text-center">
                            <button type="submit" className="text-lg rounded-lg py-3 px-6 bg-gray-400 text-white font-bold w-full sm:w-full hover:bg-gray-500">
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>       
    );
}

