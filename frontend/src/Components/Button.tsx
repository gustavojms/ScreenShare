import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
    button: string;
}

const Button: FC<Props> = ({ button }) => {
    return (
        <div className="text-center m-6">
            <button className="bg-gray-200 hover:bg-gray-300 p-3 text-xl rounded" >
                {button}
            </button>
        </div>
    )
}

export default Button;