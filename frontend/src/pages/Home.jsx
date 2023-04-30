
import { Link } from "react-router-dom";

function Home(){
    return(
        <body>
            <header className=" bg-purple-400 text-white">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    <div>
                        <Link to="/" className="font-bold text-xl">ScreenShare</Link>
                    </div>
                    <div className="flex">
                        <Link to="/Login" className="px-3 py-2 text-sm font-medium hover:text-gray-500">Entrar</Link>
                        <Link to="/Register" className="px-3 py-2 text-sm font-medium hover:text-gray-500">Cadastrar</Link>
                    </div>
                </nav>
            </header>
        </body>
    )
}

export default Home;