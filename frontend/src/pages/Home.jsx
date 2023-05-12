import { Link } from "react-router-dom";
import imghome from "../assets/img-4.jpg";
import imghome2 from "../assets/img-home2.webp";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  return (
    <body>
      <header className=" bg-black text-white">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div>
            <Link to="/" className="font-bold text-xl">
              ScreenShare
            </Link>
          </div>
          <div className="flex">
            <Link
              to="/Login"
              className="px-3 py-2 text-sm font-medium hover:text-gray-500"
            >
              Entrar
            </Link>
            <Link
              to="/Register"
              className="px-3 py-2 text-sm font-medium hover:text-gray-500"
            >
              Cadastrar
            </Link>
          </div>
        </nav>
      </header>

      <div className="flex">

        <div className=" w-1/2 h-1/2">
          <img  src={imghome} alt="Criança rindo" />
        </div>

        <div className=" text-center m-40">
        <p className="text-7xl"> Boas-vindas ao ScreenShare! </p>
        <p className=" mt-28"> Assista às aulas, tire dúvidas, salve capturas de telas.</p>
        <p className=" mt-4">Tudo em tempo real e SIMULTANEAMENTE!</p>
        </div>
      </div>

      <footer className=" bg-black text-white text-center">
        <p>
          IFPE Campus Igarassu - Rod. Gov. Mário Covas, 4031, PE, 53700-000 IFPE
        </p>
      </footer>
    </body>
  );
}

export default Home;
