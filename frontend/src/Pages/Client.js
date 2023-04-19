import { useState } from "react";
import { MdCallEnd} from 'react-icons/md'
import { BiCamera } from 'react-icons/bi'

function Client() {

    const [isVisible, setIsVisible] = useState(true)

    function toggleClass() {
        setIsVisible(!isVisible);
    }

    return (
        <body>
            <button onClick={toggleClass} className=" bg-gray-500">Received</button>
            {
             isVisible && (
                <div>
                    {
                        <div className="fixed bottom-4 inset-x-0 flex justify-center items-center">
                            <div className="flex items-center justify-center text-center">
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded">
                                    <MdCallEnd className="inline-block align-middle text-center" size={30}/>
                                </button>
                                <button className=" bg-gray-600 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded">
                                    <BiCamera className="inline-block align-middle text-center" size={30}/>
                                </button>
                            </div>
                        </div>
                    }
                </div>
             )   
            }
        </body>
    )
}

export default Client;