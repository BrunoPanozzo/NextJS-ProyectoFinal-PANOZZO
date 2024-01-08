'use client'

import { useCartContext } from '@/context/CartContext';
import { useState, useEffect } from 'react'
import styles from './contador.module.css'
import Boton from './Boton';
import Link from 'next/link';

const Contador = ({ item }) => {

    const { addItem, getItem } = useCartContext()

    const [stockDisponible, setStockDisponible] = useState(item.stock);
    const [contador, setContador] = useState(0);
    const [finalizarCompra, setFinalizarCompra] = useState(false);

    const incrementarCantidad = () => {
        if (contador < stockDisponible)
            setContador(contador + 1)
    }

    const decrementarCantidad = () => {
        if (contador >= 1)
            setContador(contador - 1)
    }

    function onAdd(quantity) {
        setContador(quantity)
        setStockDisponible(stockDisponible - quantity)
        //actualizo mi carrito
        addItem(item, quantity)
        //seteo mi flag para indicar que confirmé una compra
        setFinalizarCompra(true)
    }

    function actualizarStock(itemSlug) {
        const item = getItem(itemSlug)
        if (item)
            setStockDisponible(stockDisponible - item.quantity)
    }

    useEffect(() => {        
        actualizarStock(item.slug)
    }, [])


    return (
        <div className={styles.container}>
            <p className="pb-1 text-xl">Stock Disponible: {stockDisponible}</p>

            {finalizarCompra
                ? <div>
                    <p className="my-6 text-2xl font-bold text-center">Ud. ha comprado {contador} artículo/s.</p>
                    <div className="flex flex-col justify-center items-center my-6">
                        <Link href="/tienda/todos" className="text-xl align-middle text-center border rounded-2xl my-3 py-1 px-6 bg-gray-600 text-white hover:bg-[#3535da]">Elegir más productos</Link>
                        <Link href="/cart" className="text-xl align-middle text-center border rounded-2xl my-3 py-1 px-6 bg-gray-600 text-white hover:bg-[#3535da]">Finalizar Compra</Link>
                    </div>
                </div>
                : (stockDisponible != 0)
                    ?
                    <div className="flex flex-col justify-center items-center">
                        <div className={styles.counter}>
                            <Boton className={styles.btnDecrementar} onClick={decrementarCantidad}>
                                -
                            </Boton>
                            <label className={styles.counterValue}>{contador}</label>
                            <Boton className={styles.btnIncrementar} onClick={incrementarCantidad}>
                                +
                            </Boton>
                        </div>
                        <Boton className="text-xl mt-5 align-middle text-center border rounded-2xl py-2 px-6 bg-gray-600 text-white " onClick={() => onAdd(contador)}>
                            Agregar al carrito
                        </Boton>
                    </div>
                    :
                    <div className="flex flex-col justify-center items-center my-6">
                        <Link href="/tienda/todos" className="text-xl align-middle text-center border rounded-2xl my-3 py-1 px-6 bg-gray-600 text-white hover:bg-[#3535da]">Elegir más productos</Link>
                        <Link href="/cart" className="text-xl align-middle text-center border rounded-2xl my-3 py-1 px-6 bg-gray-600 text-white hover:bg-[#3535da]">Finalizar Compra</Link>
                    </div>
            }            
        </div>
    )
}

export default Contador