import { NextResponse } from 'next/server'
import { db } from '@/firebase/config' 
import { collection, getDocs, query, where } from "firebase/firestore"

export async function GET(request, {params}) {
    const {categoria} = params

    const coleccionProductos = collection(db, "productos")
    const q = categoria === 'todos'? coleccionProductos : query(coleccionProductos, where("categoria", "==", categoria))
    const querySnapshot = await getDocs(q)
    const productosFiltrados = querySnapshot.docs.map(doc => doc.data())
    console.log(productosFiltrados)
    return NextResponse.json(productosFiltrados)
}