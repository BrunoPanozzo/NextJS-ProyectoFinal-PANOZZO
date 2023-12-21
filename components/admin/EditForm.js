'use client'

import { useState } from "react"
import Boton from "../ui/Boton"
import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/firebase/config"
import Retornar from "../ui/Retornar"
import Link from "next/link"

const updateProduct = async (slug, values, file) => {
    let fileURL = values.imagen

    if (file) {
        const storageRef = ref(storage, values.slug)
        const fileSnapshot = await uploadBytes(storageRef, file)
        fileURL = await getDownloadURL(fileSnapshot.ref)
    }

    const docRef = doc(db, "productos", slug)
    return updateDoc(docRef, {
        nombre: values.nombre,
        descripcion: values.descripcion,
        stock: Number(values.stock),
        precio: Number(values.precio),
        categoria: values.categoria,
        imagen: fileURL
    }).then(() => console.log("Producto actualizado exitosamente"))
}
const EditForm = ({ producto }) => {

    const { nombre, descripcion, stock, precio, categoria, imagen } = producto
    const [values, setValues] = useState({
        nombre,
        descripcion,
        stock,
        precio,
        categoria,
        imagen
    })
    const [file, setFile] = useState(null)

    const [altaExitosa, setAltaExitosa] = useState(false)

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateProduct(producto.slug, values, file)
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
                    <input type="file" name="imagen" onChange={(e) => setFile(e.target.files[0])}
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

                <div className="flex items-center justify-center font-mono text-lg">
                    {
                        altaExitosa
                            ? <div className="flex flex-col items-center justify-center font-mono text-lg">
                                <h2 className="text-2xl border-b border-gray-200 pb-4 mb-4 pt-12 font-bold text-center">Producto modificado exitosamente!!</h2>
                                <Link href="/admin"> <Boton className="flex justify-center items-center font-mono text-lg my-4 hover:bg-[#3535da]">Volver</Boton></Link>
                            </div>
                            : <Boton type="submit" className="flex justify-center items-center font-mono text-lg my-4 hover:bg-[#3535da]">Guardar cambios</Boton>
                    }
                </div>
            </form>
        </main>
    )
}

export default EditForm