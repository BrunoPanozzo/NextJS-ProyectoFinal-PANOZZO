"use client"

import { useState } from "react"
import { setDoc, doc, Timestamp, getDoc, writeBatch } from "firebase/firestore"
import { db } from "@/firebase/config"
import Boton from "../ui/Boton"
import { useCartContext } from "@/context/CartContext"
import BotonEnviar from "../ui/BotonEnviar"
import Link from "next/link"
import { useAuthContext } from "@/context/AuthContext"
import InputEmail from "../ui/InputEmail"
import InputText from "../ui/InputText"
import Swal from "sweetalert2";

const createOrder = async (values, items, montoTotal) => {

    try {
        //recupero de la BD los productos del carrito
        const productosActualizarStock = await Promise.all(items.map(async item => {
            const docRef = doc(db, "productos", item.slug)
            return await getDoc(docRef)
        }))
        const batchUpdates = writeBatch(db)

        //identifico aquellos productos que pueden NO tener stock
        const sinStock = []
        productosActualizarStock.forEach((doc) => {
            if (doc && doc.exists()) {
                const { stock, slug } = doc.data()
                const productoDelCarrito = items.find(item => item.slug === slug)
                productoDelCarrito.quantity <= stock
                    ?
                    batchUpdates.update(doc.ref, { stock: stock - productoDelCarrito.quantity })
                    :
                    sinStock.push(productoDelCarrito)
            }
            else {
                console.error("Documento no definido.");
            }
        })
        await batchUpdates.commit();

        //verifico si en el carrito tengo productos SIN stock
        if (sinStock.length > 0)
            return sinStock

    } catch (error) {
        console.error('Error----->', error);
    }

    //si llegué hasta este punto, estoy en condiciones de generar la orden de compra
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
        nombre: user.nombre,
        email: user.email,
        direccion: ''
    })

    const [finalizarCompra, setFinalizarCompra] = useState(false)
    const [loading, setLoading] = useState(false)

    const cantidadArticulosComprados = totalItems()

    const ref = `/orders/` + user.email

    //cuando el CART está vacío no se muestra este form
    if (cantidadArticulosComprados === 0) {
        if (finalizarCompra)
            return (
                <div className="flex flex-col items-center justify-center font-mono text-lg">
                    <h2 className="text-2xl border-b border-gray-200 pb-4 mb-4 pt-12 font-bold text-center">Orden de compra generada exitosamente!!</h2>
                    <p className="text-2xl border-b border-gray-200 pb-4 mb-4 pt-12 font-bold text-center">El número asignado a la compra es {orderId}</p>
                    <Link href={ref}>
                        <Boton className="text-2xl align-middle text-center border rounded-2xl py-2 px-6 bg-gray-600 text-white ">Consultar mis Compras</Boton>
                    </Link>
                </div>
            )
        else
            return (
                <></>
            )
    }

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
            const nroOrdenCompra = await createOrder(values, cart, totalMonto())
            //vacio el carrito
            clearCart()
            //
            setOrderId(nroOrdenCompra)
            setFinalizarCompra(true)
            setLoading(false)
        }
        else {
            if (user.logged) {
                Swal.fire({
                    title: 'Ingresó un dato inválido.',
                    icon: 'warning',
                    text: 'Corriga el dato para poder generar la orden de compra.'
                })
            }
            else {
                Swal.fire({
                    title: 'Debe ingresar previamente a nuestro sitio para confirmar la compra.',
                    icon: 'warning',
                    text: 'Realice el login para poder generar la orden de compra correspondiente.'
                })
            }
        }
    }

    //función para validar el nombre, solo permite letras y el caracter de espacio vacío
    const validarNombre = (nombre) => {
        return /^[a-z A-Z]+$/.test(nombre)
    }

    //función para validar un email
    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const userValid = () => {
        return validarNombre(user.nombre) && validarEmail(user.email)
    }

    return (
        <div className="flex justify-center items-center bg-blue-400 bg-opacity-25 container m-auto w-4/6">
            {
                finalizarCompra
                    ?
                    <div className="flex flex-col items-center justify-center font-mono text-lg">
                        <h2 className="text-2xl border-b border-gray-200 pb-4 mb-4 pt-12 font-bold text-center">{`Orden de compra  generada exitosamente!!`}</h2>
                        <Link href="/tienda/todos">
                            <Boton className="text-2xl align-middle text-center border rounded-2xl py-2 px-6 bg-gray-600 text-white ">Volver a la Tienda</Boton>
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
                                    {/* <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Nombre: </label>
                                    <input type="text" name="nombre" value={user.nombre} onChange={handleChange} required placeholder="Tu nombre"
                                        className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" /> */}
                                    <InputText value={user.nombre} name="nombre" onChange={handleChange} placeholder="Tu nombre">Nombre: </InputText>
                                </div>
                                <div className="mb-4">
                                    {/* <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Email: </label>
                                    <input type="email" name="email" value={user.email} onChange={handleChange} required placeholder="Tu email"
                                        className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" /> */}
                                    <InputEmail value={user.email} name="email" onChange={handleChange} >Email: </InputEmail>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Direccion: </label>
                                    <input type="direccion" name="direccion" onChange={handleChange} required placeholder="Tu dirección"
                                        className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" />
                                </div>
                                <div className="flex flex-col items-center justify-center ">
                                    <Boton type="submit" className="text-2xl align-middle text-center border rounded-2xl py-2 px-6 bg-gray-600 text-white ">Finalizar mi compra</Boton>
                                </div>
                            </form>
                        }
                    </div>
            }
        </div>

    )
}

export default ClientForm