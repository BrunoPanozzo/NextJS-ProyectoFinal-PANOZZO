import Image from "next/image"
import Retornar from "../ui/Retornar"
import Contador from "../ui/Contador"
import NotFound from "@/app/not-found"

const getProducto = async (slug) => {

    try {       
        const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/producto/${slug}`, { cache: 'no-store' })

        if (!response.ok)
            throw new Error(`Falló la obtención del producto ${slug}.`)

        return response.json()
    }
    catch (error) {
        console.error('Fetch error:', error);
        return null
    }
}

const DetalleProducto = async ({ slug }) => {

    const producto = await getProducto(slug);

    if (!producto)
        return (
            <NotFound />
        )

    return (
        <div className="max-w-6xl m-auto mb-6">
            <Retornar className="text-xl mt-5 align-middle text-center border rounded-2xl py-2 px-6 bg-gray-600 text-white hover:bg-[#3535da]">
                Volver
            </Retornar>
            <h1 className="font-bold text-4xl text-center mb-10">Producto Seleccionado</h1>
            <h2 className="text-5xl border-b border-gray-200 pb-4 mb-4 pt-12 font-bold text-center">{producto.nombre}</h2>
            <article className="bg-gray-200 flex flex-col justify-center items-center p-12">
                <section className="flex flex-row justify-center items-center">
                    <div className="relative basis-1/2 pt-20 text-2xl content-start">
                        <Image
                            src={producto.imagen}
                            alt={producto.nombre}
                            width={860}
                            height={860}
                            className="h-auto w-11/12"
                        />
                    </div>
                    <div>
                        <p className="text-center pb-10 text-5xl font-bold">$ {producto.precio.toLocaleString()}</p>
                        <Contador item={producto} />
                        {
                            producto.stock === 0 && <p className="text-center pb-10 text-3xl font-bold text text-red-600">No hay stock de este producto</p>
                        }
                    </div>
                </section>
                <section className="mt-12 pt-20 text-2xl content-start">
                    <p className="text-gray-600">{producto.descripcion}</p>
                </section>
            </article>
        </div>
    )
}

export default DetalleProducto