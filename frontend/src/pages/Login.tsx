import Button from "../Components/Button";
import TextField from "../Components/TextField";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FC } from "react";
import BannerRegister from '../assets/Bannerregister.jpeg';

interface FormValues {
    email: string;
    senha: string;
}

const Login: FC = () => {

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
        <div className="bg-gray-800">
            <div className="items-center justify-center flex h-screen">
                <div className="shadow-lg items-center justify-center p-2 bg-white w-96 rounded-tl rounded-bl h-4/5">
                    <h1 className="text-center text-gray-800 font-semibold text-3xl mt-28">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            placeholder="Email"
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange} />
                        <TextField
                            label="Senha"
                            placeholder="Senha"
                            name="senha"
                            value={formValues.senha}
                            onChange={handleInputChange} />
                        <Button button="Login" />
                    </form>
                    <p className="text-center text-gray-800 font-semibold mt-3 text-lg">Não possui conta? Cadastre-se <Link to={"/Register"} className="text-blue-700 hover:text-blue-800">aqui</Link></p>
                </div>
                <div className="bg-white items-center justify-center h-4/5 w-96 rounded-tr rounded-br">
                    <img className=" h-auto w-auto mt-20" src={BannerRegister} />
                </div>
            </div>
        </div>
    )
}

export default Login;