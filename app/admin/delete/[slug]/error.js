'use client'

import Boton from "@/components/ui/Boton"
import { useEffect } from "react"

const Error = ({error, reset}) => {

    useEffect(()=> {
        console.log(error)
    },[error])

    return (
        <div className="container m-auto mt-5">
            <h1 className="text-4xl text-blue-600 my-4">La página solicitada arrojó un error.</h1>
                <hr />
                <p className="text-base mt-4">Disculpe, tenemos problemas para procesar su solicitud.</p>

                <Boton onClick={reset} className="mt-5">
                    Intentar nuevamente
                </Boton>
        </div>
    )
}

export default Error