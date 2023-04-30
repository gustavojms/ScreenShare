const Button = (props) => {
    return(
        <div className="text-center m-6">
            <button className="bg-gray-200 hover:bg-gray-300 p-3 text-xl rounded" >{props.button}</button>
        </div>
    )
}

export default Button;