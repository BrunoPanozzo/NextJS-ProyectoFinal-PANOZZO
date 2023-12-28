import Producto from './Producto'

const getProductos = async (categoria) => {

    const response = await fetch(`http://localhost:3000/api/productos/${categoria}`, { cache: 'no-store' })

    // if (!response.ok)
    //     throw new Error("Falló la obtención de los productos.")

    return response.json()
}

const ListaProductos = async ({ categoria }) => {

    const items = await getProductos(categoria);

    return (
        <section className="container m-auto flex justify-center items-center gap-12 flex-wrap">
            {
                items.map(item => <Producto key={item.slug} item={item}/>)
            }
        </section>
    )
}
export default ListaProductos