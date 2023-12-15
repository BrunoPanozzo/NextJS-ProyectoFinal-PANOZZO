// import ListaProductos from "@/components/productos/ListaProductos"

// const AdminPage = () => {

//     return (
//         <div className="container m-auto mt-6">      
//             <h2 className="my-10 border-b border-red-900 pb-4 font-mono font-bold text-4xl text-center">Panel de Administración</h2>
//             <ListaProductos categoria={"todos"} mostrarBotones={true}/>
//         </div>                   
//     )
// }

// export default AdminPage

import LogoutButton from "@/components/admin/LogoutButton"
import ProductsTable from "@/components/admin/ProductsTable"

const Admin = () => {

    return (
        <div className="container m-auto mt-6">
            <h2 className="text-4xl text-blue-600 my-4 text-center font-mono">Panel de Administración</h2>
            <hr/>  
            <LogoutButton /> 
            <ProductsTable />
        </div>
    )
}

export default Admin