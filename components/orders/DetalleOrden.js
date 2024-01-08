import Image from "next/image"

const OrderItem = ({ order }) => {

    const getImagenProducto = async (slug) => {
        
        try {
            const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/producto/${slug}`, { cache: 'no-store' })

            if (!response.ok)
                throw new Error("Falló la obtención del producto.")

            return response.json()
        }
        catch (error) {
            console.error('Fetch error:', error);
            return null
        }
    }

    return (
        <div className="m-5 p-1 w-full container text-center hover:bg-gray-400 border border-blue-100 rounded">
            <div className="flex flex-wrap  w-1/2">
                <h2 className="pb-1 text-xl font-bold mb-3">Nro de Compra: {order.nroOrden}</h2>
                <p className="pb-1 text-xl font-bold mb-0">Fecha: {order.fecha}</p>
                {
                    order.items.map(async item => (
                        <div key={item.slug} className="relative flex-grow max-w-full flex-1 px-4">
                            <Image
                                src={(await getImagenProducto(item.slug)).imagen}
                                className="img-fluid float-start rounded-start"
                                alt={item.nombre}
                                width={300}
                                height={300} />
                            <p className="pb-1 text-xl font-bold mb-0">Nombre = {item.nombre}</p>
                            <p className="pb-1 text-xl font-bold mb-0">Precio unitario = $ {item.precio.toLocaleString()}</p>
                            <p className="pb-1 text-xl font-bold mb-0">Cantidad =  {item.quantity}</p>
                            <p className="pb-1 text-xl font-bold mb-0 text-blue-700">Subtotal = $ {(item.quantity * item.precio).toLocaleString()}</p>
                        </div>
                    ))
                }
                <p className="pb-1 text-xl font-bold mb-0  text-red-700">Monto Total de la compra = $ {order.montoTotal.toLocaleString()}</p>
            </div>

        </div>
    )
}

export default OrderItem