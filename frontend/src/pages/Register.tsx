import React from "react";
import { useState } from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import TextField from "../Components/TextField";
import Button from "../Components/Button";
import axios from 'axios'

enum UserRole {
    TEACHER = "TEACHER",
    STUDENT = "STUDENT"
}

interface FormValues {
    nome: string;
    email?: string;
    senha: string;
    confirmarSenha: string;
    role: UserRole;
}

const Register: FC = () => {

    const [isEmailAlreadyTaken, setIsEmailAlreadyTaken] = useState(false);

    const [formValues, setFormValues] = useState<FormValues>({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        role: UserRole.STUDENT,
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (
            !formValues.nome ||
            !formValues.email ||
            !formValues.role ||
            !formValues.senha ||
            !formValues.confirmarSenha
        ) {
            alert("Preencha todos os campos!");
            return;
        }
        if (formValues.senha !== formValues.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }
        console.log(formValues);

        const data = {
            userName: formValues.nome,
            email: formValues.email,
            password: formValues.senha,
            role: formValues.role,
        };

        axios.post('http://localhost:3000/user', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                if (error.response.status === 409) {
                    setIsEmailAlreadyTaken(true);
                    alert("email já cadastrado")
                } else {
                    console.error(error);
                }
            });
    };

    return (
        <body className="items-center justify-center flex h-screen">
            {isEmailAlreadyTaken && (
                <p className="text-red-500">Esse e-mail já está cadastrado. Por favor, use outro e-mail.</p>
            )}
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
                    <div className="mt-4 mr-10 ml-10 h-auto w-auto flex flex-col">
                        <label className="font-semibold text-black text-xl">Você é</label>
                        <select
                            name="role"
                            value={formValues.role}
                            onChange={handleSelectChange}
                            className="rounded h-10 p-1 bg-gray-200 hover:bg-gray-300"
                        >
                            <option value="">Selecione uma opção</option>
                            <option value={UserRole.TEACHER}>TEACHER</option>
                            <option value={UserRole.STUDENT}>STUDENT</option>
                        </select>
                    </div>
                    <TextField
                        label="Senha"
                        placeholder="Senha"
                        name="senha"
                        value={formValues.senha}
                        type="password"
                        onChange={handleInputChange} />
                    <TextField
                        label="Confirmar Senha"
                        placeholder="Confirmar Senha"
                        name="confirmarSenha"
                        value={formValues.confirmarSenha}
                        type="password"
                        onChange={handleInputChange} />
                    <Button button="Criar Conta" />
                </form>
                <p className="text-white text-center font-semibold">Já possui conta? Entre clicando <Link to={"/Login"} className="text-blue-700 hover:text-blue-800">aqui</Link></p>
            </div>
        </body>
    )
}

export default Register;