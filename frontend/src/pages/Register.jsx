import React from "react";
import TextField from "../Components/TextField";
import Button from "../Components/Button";

const Register = () => {
    return(
        <body className="items-center justify-center flex h-screen">
            <div className="items-center justify-center p-2 bg-purple-400 w-96 rounded">
            <h1 className="text-center text-3xl text-white font-semibold">Register</h1>
            <TextField label="Nome" placeholder="teste"/>
            <TextField label="Email" placeholder="teste"/>
            <TextField label="Matricula" placeholder="teste"/>
            <TextField label="CPF" placeholder="teste" type="number" />
            <Button button="Register"/>
            </div>
        </body>
    )
}

export default Register;