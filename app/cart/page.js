import CartList from "@/components/cart/CartList"

const CartPage = () => {
    return (
        <div className="container m-auto mt-6">
            <h1 className="my-10 border-b border-red-900 pb-4 font-mono font-bold text-4xl text-center">Productos Comprados</h1>
            <CartList/>
        </div>
    )
}

export default CartPage