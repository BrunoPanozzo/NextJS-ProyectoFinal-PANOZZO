
import LogoutButton from "@/components/admin/LogoutButton"
import ProductsTable from "@/components/admin/ProductsTable"

const Admin = () => {

    return (
        <div className="container m-auto mt-6">
            <h2 className="text-4xl text-blue-600 my-4 text-center font-mono">Panel de Administración</h2>
            <hr/>  
            <ProductsTable />
        </div>
    )
}

export default Admin