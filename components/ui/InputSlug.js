'use client'

import { useState } from "react"

const InputSlug = ({ children, className, ...args }) => {

    const [valido, setValido] = useState("")

    //función para validar el slug
    function validar(slug) {
        validarURL(`http://${process.env.NEXT_PUBLIC_API_URL}/${slug}`)
            ?
            setValido("")
            :
            setValido("shadow-lg shadow-red-950")
    }

    function validarURL(miurl) {
        try {
            new URL(miurl);
            return true;
        } catch (err) {
            return false;
        }
    }

    return (
        <div>
            <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">
                {children}
            </label>
            <input type="text" onKeyDown={(e) => validar(e.target.value)} required className={`w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono ${className} ${valido}`}
                {...args} />
        </div>
    )
}

export default InputSlug