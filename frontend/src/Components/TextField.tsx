import '../index.css'
import React from 'react';

interface Props {
    label: string;
    type?: string;
    placeholder?: string;
    name?: string;
    value?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const TextField = ({ label, type, placeholder, name, value, onChange }: Props) => {
    return (
        <div className="mt-4 mr-10 ml-10 h-auto w-auto flex flex-col">
            <label className="font-semibold text-black text-xl" >{label}</label>
            <input className="rounded h-10 p-1 bg-gray-200 hover:bg-gray-300"
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange} />
        </div>
    )
}

export default TextField;