'use client'

import { useState } from "react"
import Boton from "../ui/Boton"
import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/firebase/config"
import Retornar from "../ui/Retornar"
import BotonEnviar from "../ui/BotonEnviar"
import InputText from "../ui/InputText"
import InputNumber from "../ui/InputNumber"
import Swal from "sweetalert2";

const updateProduct = async (slug, values, file) => {
    let fileURL = values.imagen

    if (file) {
        const storageRef = ref(storage, slug)
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

    const [editExitoso, setEditExitoso] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (userValid()) {
            setLoading(true)
            await updateProduct(producto.slug, values, file)
            setEditExitoso(true)
            setLoading(false)
        }
        else {
            Swal.fire({
                title: 'Ingresó un dato inválido.',
                icon: 'warning',
                text: 'Corriga el dato para poder modificar el producto.'
            })
        }
    }

    //función para validar precio y stock, solo permite numeros
    const validarNumero = (numero) => {
        return /^[0-9]+$/.test(numero)
    }   

    const userValid = () => {
        return validarNumero(values.precio) && validarNumero(values.stock)
    }

    return (
        <main className="container m-auto w-3/6">
            <h1 className="text-4xl text-blue-600 my-4 text-center font-mono">Modificación de producto</h1>
            <hr />
            <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4 rounded-xl">
                <div className="mb-4">
                    {/* <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Nombre: </label>
                    <input type="text" value={values.nombre} name="nombre" onChange={handleChange} required className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" /> */}
                    <InputText value={values.nombre} name="nombre" onChange={handleChange} >Nombre: </InputText>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Imagen: </label>
                    <input type="file" name="imagen" onChange={(e) => setFile(e.target.files[0])}
                        className="w-1/2 file:mr-12 file:py-2 file:px-6 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:text-center file:bg-gray-600 file:text-white hover:file:bg-[#3535da]" />
                </div>
                <div className="mb-4">
                    {/* <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Precio: </label>
                    <input type="number" value={values.precio} name="precio" onChange={handleChange} required className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" /> */}
                    <InputNumber value={values.precio} name="precio" onChange={handleChange} >Precio: </InputNumber>
                </div>
                <div className="mb-4">
                    {/* <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Stock: </label>
                    <input type="number" value={values.stock} name="stock" onChange={handleChange} required className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" /> */}
                    <InputNumber value={values.stock} name="stock" onChange={handleChange} >Stock: </InputNumber>
                </div>
                <div className="mb-4">
                    {/* <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Categoría: </label>
                    <input type="text" value={values.categoria} name="categoria" onChange={handleChange} required className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" /> */}
                    <InputText value={values.categoria} name="categoria" onChange={handleChange} >Categoría: </InputText>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Descripción: </label>
                    <textarea type="text" value={values.descripcion} name="descripcion" onChange={handleChange} required className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" rows="5"></textarea>
                </div>

                <div className="flex items-center justify-center font-mono text-lg">
                    {
                        editExitoso
                            ?
                            <div className="flex flex-col items-center justify-center font-mono text-lg">
                                <h2 className="text-2xl border-b border-gray-200 pb-4 mb-4 pt-12 font-bold text-center">Producto modificado exitosamente!!</h2>
                                <Retornar className="flex justify-center items-center font-mono text-lg my-4 hover:bg-[#3535da]">Volver</Retornar>
                            </div>
                            :
                            <div>
                                {loading
                                    ?
                                    <BotonEnviar>
                                        Enviando...
                                    </BotonEnviar>
                                    :
                                    <div className="flex flex-row items-center justify-center font-mono text-lg">
                                        <Boton type="submit" className="font-mono text-lg my-4 ">Guardar cambios</Boton>
                                        <Retornar className="font-mono text-lg my-4 ml-10 hover:bg-[#3535da]">Volver</Retornar>
                                    </div>
                                }
                            </div>
                    }
                </div>
            </form>
        </main>
    )
}

export default EditForm