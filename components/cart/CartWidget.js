'use client'

import { useCartContext } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

const CartWidget = () => {

    const { totalItems } = useCartContext()
    
    const cantidadArticulosComprados = totalItems()

    //cuando el CART está vacío
    if (cantidadArticulosComprados === 0)
        return (
            <>
            </>
        )

    //cuando el CART contiene productos
    return (
        <div>
            <Link className="flex flex-row" href={"/cart"}>
                    <Image className="align-middle text-center font-normal py-1 px-3 leading-normal btn-ligth relative"
                        src={"/imgs/NavBar/carrito.png"}
                        alt='Carrito de compras'
                        width={100}
                        height={70}
                    />
                    <span id="cantidadProductos" className="absolute p-1 text-center font-semibold text-sm rounded-full py-2 px-4 bg-blue-600">{cantidadArticulosComprados}</span>
                </Link>
        </div>
    )
}

export default CartWidget


