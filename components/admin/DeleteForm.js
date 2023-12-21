'use client'

import { useState } from "react"
import Boton from "../ui/Boton"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "@/firebase/config"

const deleteProduct = async (slug) => {
    const docRef = doc(db, "productos", slug)
   
    return deleteDoc(docRef).then(() => console.log("Producto borrado exitosamente"))
}
const DeleteForm = ({producto}) => {

    const { nombre, slug } = producto
    
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => { 
        e.preventDefault()
        await updateProduct(slug)
        setAltaExitosa(true)
    }

    return (
        <main className="container m-auto w-3/6">
            <h1 className="text-4xl text-blue-600 my-4 text-center font-mono">Modificación de producto</h1>
            <hr />
            <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4 rounded-xl">   
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Nombre: </label>
                    <input type="text" value={values.nombre} name="nombre" onChange={handleChange} required className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" />
                </div>             
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Imagen: </label>
                    <input type="file" setFile={values.imagen} name="imagen" onChange={(e) => setFile(e.target.files[0])}
                        className="w-1/2 file:mr-12 file:py-2 file:px-6 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:text-center file:bg-gray-600 file:text-white hover:file:bg-[#3535da]" />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Precio: </label>
                    <input type="number" value={values.precio} name="precio" onChange={handleChange} required className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Stock: </label>
                    <input type="number" value={values.stock} name="stock" onChange={handleChange} required className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Categoría: </label>
                    <input type="text" value={values.categoria} name="categoria" onChange={handleChange} required className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Descripción: </label>
                    <textarea value={values.descripcion} name="descripcion" onChange={handleChange} required className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" rows="5" type="text"></textarea>
                </div>

                <div className="flex items-center justify-between font-mono text-lg">
                    <Boton type="submit" className="flex justify-between items-center ml-auto font-mono text-lg my-4">Enviar</Boton>
                </div>
            </form>
        </main>
    )
}

export default DeleteForm