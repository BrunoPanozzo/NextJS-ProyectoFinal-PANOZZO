import Producto from './Producto'

const getProductos = async (categoria) => {

    try {
        // const response = await fetch(`http://localhost:3000/api/productos/${categoria}`, { cache: 'no-store' })
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/productos/${categoria}`, { cache: 'no-store' })
        process.env.NEXT_PUBLIC_API_URL
        // if (!response.ok)
        //     throw new Error("Falló la obtención de los productos.")

        return response.json()
    }
    catch (error) {
        console.error('Fetch error:', error);
        return null
    }
}

const ListaProductos = async ({ categoria }) => {

    const items = await getProductos(categoria);

    return (
        <section className="container m-auto flex justify-center items-center gap-12 flex-wrap">
            {
                items.map(item => <Producto key={item.slug} item={item} />)
            }
        </section>
    )
}
export default ListaProductos