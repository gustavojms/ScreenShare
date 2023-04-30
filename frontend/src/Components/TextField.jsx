import '../index.css'

const TextField = (props) => {
    return(
        <div className="mt-4 mr-10 ml-10 h-auto w-auto flex flex-col">
            <label className="font-semibold text-black text-xl" >{props.label}</label>
            <input className="rounded h-10 p-1 bg-gray-200 hover:bg-gray-300" type={props.type} placeholder={props.placeholder}/>
        </div>
    )
}

export default TextField;