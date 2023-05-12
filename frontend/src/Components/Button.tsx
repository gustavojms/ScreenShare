import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
    button: string;
}

const Button: FC<Props> = ({ button }) => {
    return (
        <div className="text-center mt-4 mr-10 ml-10 h-auto w-auto">
            <button className="bg-gray-800 text-white hover:bg-black p-3 text-xl rounded w-full" >
                {button}
            </button>
        </div>
    )
}

export default Button;