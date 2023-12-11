import ListaProductos from "@/components/productos/ListaProductos"

const AdminPage = () => {

    return (
        <div className="container m-auto mt-6">      
            <h2 className="my-10 border-b border-red-900 pb-4 font-mono font-bold text-4xl text-center">Panel de Administración</h2>
            <ListaProductos categoria={"todos"} mostrarBotones={true}/>
        </div>                   
    )
}

export default AdminPage