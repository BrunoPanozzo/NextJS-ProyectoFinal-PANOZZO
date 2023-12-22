import CreateForm from "@/components/admin/CreateForm"
import CartList from "@/components/cart/CartList"
import ClientForm from "@/components/cart/ClientForm"

const CartPage = () => {
    return (
        <div className="container m-auto mt-6">
            <h1 className="my-10 border-b border-red-900 pb-4 font-mono font-bold text-4xl text-center">Productos Comprados</h1>
            <CartList/>
            <ClientForm/>
        </div>
    )
}

export default CartPage