'use client'

import { useState } from "react"
import Boton from "../ui/Boton"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "@/firebase/config"
import Retornar from "../ui/Retornar"
import Image from "next/image"
import BotonEnviar from "../ui/BotonEnviar"

const deleteProduct = async (slug) => {
    const docRef = doc(db, "productos", slug)

    return deleteDoc(docRef).then(() => console.log("Producto borrado exitosamente"))
}
const DeleteForm = ({ producto }) => {

    const { nombre, slug, precio, imagen } = producto

    const [deleteExitoso, setDeleteExitoso] = useState(false)
    const [loading, setLoading] = useState(false)

    const borrarProducto = async (e) => {       
        setLoading(true)
        await deleteProduct(slug)
        setDeleteExitoso(true)
        setLoading(false)
    }

    return (
        <main className="container m-auto w-3/6">
            <h1 className="font-bold text-4xl text-center mb-10">Producto a Eliminar</h1>
            <h2 className="text-5xl border-b border-gray-200 pb-4 mb-4 pt-12 font-bold text-center">{nombre}</h2>
            <article className="bg-gray-200 flex flex-col justify-center items-center p-12">
                <section className="flex flex-row justify-center items-center">
                    <div className="relative basis-1/2 pt-20 text-2xl content-start">
                        <Image
                            src={imagen}
                            alt={nombre}
                            width={860}
                            height={860}
                            className="h-auto w-11/12"
                        />
                    </div>
                    <div>
                        <p className="text-center pb-10 text-5xl font-bold">$ {precio.toLocaleString()}</p>
                        <div className="flex items-center justify-center font-mono text-lg">
                            {
                                deleteExitoso
                                    ?
                                    <div className="flex flex-col items-center justify-center font-mono text-lg">
                                        <h2 className="text-2xl border-b border-gray-200 pb-4 mb-4 pt-12 font-bold text-center">Producto borrado exitosamente!!</h2>
                                        <Retornar className="flex justify-center items-center font-mono text-lg my-4 hover:bg-[#3535da]">Volver</Retornar>
                                    </div>
                                    :
                                    <div>
                                        {loading
                                            ?
                                            <BotonEnviar>
                                                Borrando...
                                            </BotonEnviar>
                                            :
                                            <div className="flex flex-row items-center justify-center font-mono text-lg">
                                                <Boton className="font-mono text-lg my-4 hover:bg-[#3535da]" onClick={()=>{borrarProducto()}} >Borrar</Boton>
                                                <Retornar className="font-mono text-lg my-4 ml-10 hover:bg-[#3535da]">Cancelar</Retornar>
                                            </div>
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </section>
            </article>
        </main>
    )
}

export default DeleteForm