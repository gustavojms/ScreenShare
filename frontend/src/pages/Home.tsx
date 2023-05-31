import { Link } from "react-router-dom";
import React from "react";
import imghome from "../assets/img-4.jpg";
import Button from "../Components/Button";
import TextField from "../Components/TextField";
import { FC } from "react";
import { useState } from "react";

interface FormValues {
  email: string;
  senha: string;
}

const Home: FC = () => {

  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    senha: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (
      !formValues.email ||
      !formValues.senha
    ) {
      alert("Preencha todos os campos!");
      return;
    }
    console.log(formValues);
  };

  function teste() {
    <Link to={"/Student"} />
  }


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
          <img src={imghome} alt="Criança rindo" />
        </div>

        <div className=" flex flex-col items-center justify-center p-2 bg-white w-auto h-4/5">
          <h1 className="text-7xl mt-10 text-center"> Boas-vindas ao ScreenShare! </h1>
          <p className="text-xl mt-5">Faça login ou faça seu cadastro!</p>
          <div className=" w-1/2 justify-center items-center">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                placeholder="Email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
              <TextField
                label="Senha"
                placeholder="Senha"
                name="senha"
                value={formValues.senha}
                onChange={handleInputChange}
              />
              <Button button="Login" />
            </form>
            <p className="text-center text-gray-800 font-semibold mt-3 text-lg">Não possui conta? Cadastre-se <Link to={"/Register"} className="text-blue-700 hover:text-blue-800">aqui</Link></p>
          </div>
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
