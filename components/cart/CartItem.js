'use client'

import { useCartContext } from "@/context/CartContext";
import Image from "next/image";
import Boton from "../ui/Boton";

const CartItem = ({ producto }) => {

    const { removeItem } = useCartContext()

    return (
        <div className="m-5 p-1 w-full container text-center hover:bg-gray-400 border border-blue-100 rounded">
            <div className="flex flex-wrap">
                <div className="relative flex-grow max-w-full flex-1 px-4">
                    <Image
                        src={producto.imagen}
                        className="img-fluid float-start rounded-start"
                        alt={producto.nombre}
                        width={300}
                        height={300} />
                </div>
                <div className="w-1/2">
                    <h5 className="mb-3">{producto.nombre}</h5>
                    <p className="pb-1 text-xl font-bold mb-0">Cantidad: {producto.quantity}</p>
                    <p className="pb-1 text-xl font-bold mb-0">Precio por Unidad = $ {producto.precio.toLocaleString()}</p>
                    <p className="pb-1 text-xl font-bold mb-0">Subtotal = $ {(producto.quantity * producto.precio).toLocaleString()}</p>
                </div>
                <div className="relative flex-grow max-w-full flex-1 px-4 self-center">
                    <Boton className="w-40 h-16 border font-normal rounded py-1 px-3 bg-orange-400 text-black hover:bg-orange-500 hover:text-decoration hover:text-center"
                        onClick={() => removeItem(producto.slug)}>
                        <p className="mb-3">Cancelar compra</p>
                    </Boton>                    
                </div>
            </div>
        </div>
    );
}

export default CartItem