import NotFound from '@/app/not-found'
import ListaProductos from '@/components/productos/ListaProductos'
import MenuCategorias from '@/components/productos/MenuCategorias'
import { Suspense } from 'react'
import Loading from '../detail/[slug]/loading'

export async function generateMetadata({ params, searchParams }, parent) {

    return {
        title: `Categoría - ${params.categoria}`,
        description: `${params.descripcion}`,
    }
}

export function generateStaticParams () {
    return [
        {categoria: 'todos'},
        {categoria: 'Moviles'},
        {categoria: 'TV-Audio'},
        {categoria: 'Electrodomesticos'},
        {categoria: 'Computacion'}
    ]
}

export const revalidate = 1800

const ProductosPage = ({ params }) => {

    const rutasDinamicas = [
        "todos",
        "Moviles",
        "TV-Audio",
        "Electrodomesticos",
        "Computacion"
    ]

    const { categoria } = params

    const itemExistente = rutasDinamicas.some((item) => item === categoria)

    if (!itemExistente)
        return (
            <NotFound />
        )

    const texto = (categoria === 'todos' ? "Cargando todos los productos..." : `Cargando productos de ${categoria}...`)

    return (
        <main className="container m-auto">
            <h2 className="text-2xl my-10 border-b pb-4">Productos</h2>
            <div className="flex gap-10">
                <MenuCategorias />
                <Suspense fallback={<Loading texto={texto}/>}>
                    <ListaProductos categoria={categoria}/>
                </Suspense>
            </div>
        </main>
    )
}

export default ProductosPage