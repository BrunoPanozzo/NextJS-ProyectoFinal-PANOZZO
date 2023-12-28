"use client"

import { useState } from "react"
import { setDoc, doc, Timestamp } from "firebase/firestore"
import { db } from "@/firebase/config"
import Boton from "../ui/Boton"
import { useCartContext } from "@/context/CartContext"
import BotonEnviar from "../ui/BotonEnviar"
import Link from "next/link"
import { useAuthContext } from "@/context/AuthContext"

const createOrder = async (values, items, montoTotal) => {

    const order = {
        cliente: values,
        items: items.map(item => ({
            nombre: item.nombre,
            precio: item.precio,
            slug: item.slug,
            quantity: item.quantity
        })),
        fecha: new Date().toISOString(),
        montoTotal: montoTotal
    }

    const docId = Timestamp.fromDate(new Date()).toMillis()
    const orderRef = doc(db, "orders", String(docId))
    await setDoc(orderRef, order)

    return docId
}

const ClientForm = () => {

    const [orderId, setOrderId] = useState()

    const { user } = useAuthContext()

    const { cart, totalItems, totalMonto, clearCart } = useCartContext()

    const [values, setValues] = useState({
        nombre: '',
        email: '',
        direccion: ''
    })

    const [finalizarCompra, setFinalizarCompra] = useState(false)
    const [loading, setLoading] = useState(false)

    const cantidadArticulosComprados = totalItems()

    //cuando el CART está vacío no se muestra este form
    if (cantidadArticulosComprados === 0)
        return (
            <></>
        )

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const nroOrdenCompra = await createOrder(values, cart, totalMonto().toLocaleString())
        setOrderId(nroOrdenCompra)
        // console.log(result)
        setFinalizarCompra(true)
        setLoading(false)
    }

    return (
        <div className="flex justify-center items-center bg-blue-400 bg-opacity-25 container m-auto w-4/6">
            {
                finalizarCompra
                    ?
                    <div className="flex flex-col items-center justify-center font-mono text-lg">
                        <h2 className="text-2xl border-b border-gray-200 pb-4 mb-4 pt-12 font-bold text-center">{`Orden de compra  generada exitosamente!!`}</h2>
                        <Link href="/tienda/todos">
                            <Boton className="text-2xl align-middle text-center border rounded-2xl py-2 px-6 bg-gray-600 text-white hover:bg-[#3535da]" onClick={() => clearCart()}>Volver a la Tienda</Boton>
                        </Link>
                    </div>
                    :
                    <div className="container m-auto w-3/6">
                        {loading
                            ?
                            <BotonEnviar className="flex flex-row items-center justify-center font-mono text-lg">
                                Generando Orden de Compra...
                            </BotonEnviar>
                            :
                            <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4 rounded-xl">
                                <h2 className="mb-5">Completar los siguientes datos</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Nombre: </label>
                                    <input type="nombre" name="nombre" value={user.nombre} onChange={handleChange} required placeholder="Tu nombre"
                                        className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Email: </label>
                                    <input type="email" name="email" value={user.email} onChange={handleChange} required placeholder="Tu email"
                                        className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Direccion: </label>
                                    <input type="direccion" name="direccion" onChange={handleChange} required placeholder="Tu dirección"
                                        className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" />
                                </div>
                                <div className="flex flex-col items-center justify-center ">
                                    <Boton type="submit" className="text-2xl align-middle text-center border rounded-2xl py-2 px-6 bg-gray-600 text-white hover:bg-[#3535da]">Finalizar mi compra</Boton>
                                </div>
                            </form>
                        }
                    </div>
            }
        </div>

    )
}

export default ClientForm