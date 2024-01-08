import OrdersList from "@/components/orders/OrdersList"
import { db } from "@/firebase/config"
import { collection, getDocs } from "firebase/firestore"
import Link from "next/link"

const getOrders = async (email) => {
    const ordersRef = collection(db, "orders")
    const querySnapshot = await getDocs(ordersRef)
    var docs = querySnapshot.docs.map(doc => ({ ...doc.data(), nroOrden: doc.id }))
    docs = docs.filter(doc => doc.cliente.email === email)
    return docs
}

const Orders = async ({ params }) => {
    const { email } = params
    const emailUser = email.replace('%40', '@')
    const ordersByUser = await getOrders(emailUser)

    if (ordersByUser.length === 0)
        return (
            <div className="container m-auto mt-6 text-center">
                <h1 className="p-5 font-bold text-3xl mb-5">No existen ordenes de compra para el usuario {emailUser}</h1>
                <Link href="/tienda/todos" className="text-2xl align-middle text-center border rounded-2xl py-2 px-6 bg-gray-600 text-white hover:bg-[#3535da]">Volver a la Tienda</Link>
            </div>
        )

    return (
        <div>
            <div className="container m-auto mt-6">
                <h1 className="my-10 border-b border-red-900 pb-4 font-mono font-bold text-4xl text-center">Compras realizadas</h1>
                <OrdersList orders={ordersByUser} />
            </div>
        </div>
    )
}

export default Orders