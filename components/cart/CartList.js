'use client'

import { useCartContext } from "@/context/CartContext"
import Link from "next/link"
import Boton from "../ui/Boton"
import CartItem from "./CartItem"

const CartList = () => {   

    const { cart, clearCart, totalItems, totalMonto } = useCartContext()

    const cantidadArticulosComprados = totalItems()

    //cuando el CART está vacío
    if (cantidadArticulosComprados === 0)
        return (
            <div className="container m-auto mt-6 text-center">
                <h1 className="p-5 font-bold text-3xl">No existen productos en el carrito.</h1>
                <Link href="/tienda/todos" className="text-2xl align-middle text-center border rounded-2xl py-2 px-6 bg-gray-600 text-white hover:bg-[#3535da]">Volver a la Tienda</Link>
            </div>
        )

    //cuando el CART contiene productos
    return (
        <>
            <div className="flex flex-col items-center mb-12">
                <Boton onClick={() => clearCart()} className="text-2xl align-middle text-center border rounded-2xl py-2 px-6 bg-red-600 text-white hover:bg-red-800">
                    <p>Vaciar carrito</p>
                </Boton>
            </div>
            {cart.map(producto => (
                <CartItem key={producto.slug} producto={producto} />
            ))}
            <p className="pt-12 pb-12 text-2xl font-bold text-center">Ud. compró un total de {cantidadArticulosComprados} artículos por un monto total de $ {totalMonto().toLocaleString()}</p>
            <div className="flex flex-col items-center justify-center ">
                <Link href="" className="text-2xl align-middle text-center border rounded-2xl py-2 px-6 bg-gray-600 text-white hover:bg-[#3535da]">Confirmar Compra</Link>
            </div>
        </>
    )
}

export default CartList