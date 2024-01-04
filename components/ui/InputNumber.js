'use client'

import { useState } from "react"

const InputNumber = ({ children, className, ...args }) => {

    const [valido, setValido] = useState("")

    //función para validar el nombre, solo permite numeros
    function validar(numero) {
        /^[0-9]+$/.test(numero) 
        ?
        setValido("")
        :          
        setValido("shadow-lg shadow-red-950")      
    }

    return (
        <div>
            <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">
                {children}
            </label>
            <input type="number" onKeyDown={(e) => validar(e.target.value)} required className={`w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono ${className} ${valido}`}
                {...args} />
        </div>
    )
}

export default InputNumber