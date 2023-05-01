import React from "react";
import { useState } from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import TextField from "../Components/TextField";
import Button from "../Components/Button";

interface FormValues {
    nome: string;
    email: string;
    matricula: string;
    senha: string;
}

const Register: FC = () => {

    const [formValues, setFormValues] = useState<FormValues>({
        nome: "",
        email: "",
        matricula: "",
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
            !formValues.nome ||
            !formValues.email ||
            !formValues.matricula ||
            !formValues.senha

        ) {
            alert("Preencha todos os campos!");
            return;
        }
        console.log(formValues);
    };

    return (
        <body className="items-center justify-center flex h-screen">
            <div className="shadow-lg items-center justify-center p-2 bg-purple-400 w-96 rounded">
                <h1 className="text-center text-3xl text-white font-semibold">Register</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome"
                        placeholder="Nome"
                        name="nome"
                        value={formValues.nome}
                        onChange={handleInputChange} />
                    <TextField
                        label="Email"
                        placeholder="Email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange} />
                    <TextField
                        label="Matricula"
                        placeholder="Matricula"
                        name="matricula"
                        value={formValues.matricula}
                        onChange={handleInputChange}
                        />
                    <TextField
                        label="Senha"
                        placeholder="Senha"
                        name="senha"
                        value={formValues.senha}
                        onChange={handleInputChange}/>    
                    <Button button="Register"/>
                </form>
                <p className="text-white text-center font-semibold">Já possui conta? Entre clicando <Link to={"/Login"} className="text-blue-700 hover:text-blue-800">aqui</Link></p>
            </div>
        </body>
    )
}

export default Register;