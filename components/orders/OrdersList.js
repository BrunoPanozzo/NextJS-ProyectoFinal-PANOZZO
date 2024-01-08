import OrderItem from "./OrderItem"

const OrdersList = ({ orders }) => {

    var costoTodasLasCompras = 0
    orders.forEach(order => {
        costoTodasLasCompras = Number(costoTodasLasCompras) + Number(order.montoTotal)        
    });

    
    return (
        <div>
            <h2 className="pt-12 pb-12 text-3xl font-bold text-center">Ud. realizó un total de <mark className="text-5xl text-red-700 bg-white">{orders.length}</mark> compras en nuestra tienda.</h2>
            <h2 className="pt-12 pb-12 text-3xl font-bold text-center">Pagó un total de <mark className="text-5xl text-red-700 bg-white">$ {costoTodasLasCompras.toLocaleString()}</mark>.</h2>
            {orders.map(order => (
                <OrderItem key={order.nroOrden} order={order} />
            ))}
        </div>
    )
}

export default OrdersList