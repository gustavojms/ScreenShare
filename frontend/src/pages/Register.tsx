import React from "react";
import { useState } from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import TextField from "../Components/TextField";
import Button from "../Components/Button";

interface FormValues {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
}

const Register: FC = () => {

    const [formValues, setFormValues] = useState<FormValues>({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
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
            !formValues.senha ||
            !formValues.confirmarSenha
        ) {
            alert("Preencha todos os campos!");
            return;
        }
        if (formValues.senha !== formValues.confirmarSenha){
            alert("As senhas não coincidem!");
            return;
        }
        console.log(formValues);
    };

    return (
        <body className="items-center justify-center flex h-screen">
            <div className="shadow-lg items-center justify-center p-2 bg-purple-400 w-96 rounded">
                <h1 className="text-center text-3xl text-white font-semibold">Criar Conta</h1>
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
                        label="Senha"
                        placeholder="Senha"
                        name="senha"
                        value={formValues.senha}
                        type="password"
                        onChange={handleInputChange}/> 
                    <TextField
                        label="Confirmar Senha"
                        placeholder="Confirmar Senha"
                        name="confirmarSenha"
                        value={formValues.confirmarSenha}
                        type="password"
                        onChange={handleInputChange}/>   
                    <Button button="Criar Conta"/>
                </form>
                <p className="text-white text-center font-semibold">Já possui conta? Entre clicando <Link to={"/Login"} className="text-blue-700 hover:text-blue-800">aqui</Link></p>
            </div>
        </body>
    )
}

export default Register;