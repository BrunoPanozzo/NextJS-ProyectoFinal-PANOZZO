'use client'

import { useState } from "react"

const InputEmail = ({ children, className, ...args }) => {

    const [valido, setValido] = useState("")

    //función para validar un email
    function validar(email) {
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
            <input type="email" onKeyDown={(e) => validar(e.target.value)} onBlur={(e) => validar(e.target.value)} required placeholder="Tu email" className={`w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono ${className} ${valido}`}
                {...args} />
        </div>
    )
}

export default InputEmail