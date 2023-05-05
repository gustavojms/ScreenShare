import { Link } from "react-router-dom";
import imghome from "../assets/img-home1.jpg";
import imghome2 from "../assets/img-home2.webp";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  return (
    <body>
      <header className=" bg-purple-400 text-white">
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

      <div className="flex items-center bg-purple-300 justify-center h-screen">
        <Carousel
          autoPlay={true} // para fazer o carrossel passar automaticamente
          infiniteLoop={true} // para que o carrossel sempre comece do início após a última imagem
          showArrows={false} // para remover as setas de navegação
          showStatus={false} // para remover o indicador de progresso
          showThumbs={true} // para remover as miniaturas das imagens
          interval={2500} // tempo de transição entre as imagens em milissegundos
          className=" w-2/5" // para fazer as imagens ocuparem toda a largura da tela e a altura da tela
        >
          <div>
            <img className="rounded-3xl" src={imghome} alt="Imagem 1" />
            <p className=" font-serif">
              Assista aulas, tire dúvidas, salve imagens
              tudo em tempo real e SIMULTANEAMENTE!{" "}
            </p>
          </div>
          <div>
            <img className="rounded-3xl" src={imghome2} alt="Imagem 2" />
            <p className=" font-serif">Siga o IF nas redes sociais!</p>
          </div>
        </Carousel>
      </div>

      <footer className=" bg-purple-400 text-black text-center">
        <p >IFPE Campus Igarassu - Rod. Gov. Mário Covas, 4031, PE, 53700-000 IFPE</p>
      </footer>
    </body>
  );
}

export default Home;
