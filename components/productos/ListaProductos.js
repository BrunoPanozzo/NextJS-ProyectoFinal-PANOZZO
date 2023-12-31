import NotFound from '@/app/not-found';
import Producto from './Producto'

const ListaProductos = async ({ categoria }) => {
    var items = null
    try {
        items = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/productos/${categoria}`, {
            cache: 'no-store',
        }).then(r => r.json())
    }
    catch (error) {
        console.error('Fetch error:', error);
        return null
    }

    if (!items)
        return (
            <NotFound />
        )

    return (
        <section className="container m-auto flex justify-center items-center gap-12 flex-wrap">
            {
                items.map(item => <Producto key={item.slug} item={item} />)
            }
        </section>
    )
}
export default ListaProductos