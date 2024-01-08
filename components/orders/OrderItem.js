const OrderItem = ({ order }) => {

    return (
        <div className="m-5 p-1 w-full container text-center hover:bg-gray-400 border border-blue-100 rounded">
            <div className="flex flex-wrap align-middle justify-center">
                <div className="w-auto">
                    <h2 className="mb-3">{order.nroOrden}</h2>
                    <p className="pb-1 text-xl font-bold mb-0">Fecha: {order.fecha}</p>
                    {
                        order.items.map(item => (
                            <div key={item.slug}>
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
        </div>
    )
}

export default OrderItem