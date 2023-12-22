'use client' 

import Boton from '@/components/ui/Boton'
import { useEffect } from 'react'

export default function Error({ error, reset }) {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="container m-auto mt-6">
            <h2 className='text-xl'>Página de error</h2>
            <hr className='my-6'/>
            <Boton onClick={reset}>Intentar nuevamente</Boton>
        </div>
    )
}