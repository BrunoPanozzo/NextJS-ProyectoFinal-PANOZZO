import Link from "next/link"
import Image from "next/image"
import Boton from "../ui/Boton"
import Eliminar from "@/public/icons/borrar.png"
import Editar from "@/public/icons/editar.png"

const ProductsTable = async () => {
    
    var items = null
    try {
        items = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/productos/todos`, {
            cache: 'no-store',
        }).then(r => r.json())
    }
    catch (error) {
        console.error('Fetch error:', error);
        return null
    }

    return (
        <>
            <Link href={"/admin/create"}>
                <Boton className="flex justify-between items-center ml-auto font-mono text-lg my-4">
                    Crear nuevo producto
                </Boton>
            </Link>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-sm text-blue-600 uppercase ">
                        <tr className="border border-slate-300">
                            <th scope="col" className="px-3 py-2">Nombre</th>
                            <th scope="col" className="px-10 py-2 w-40">Precio</th>
                            <th scope="col" className="px-3 py-2">Stock disponible</th>
                            <th scope="col" className="px-3 py-2">Categoría</th>
                            <th scope="col" className="px-3 py-2">Imagen</th>
                            <th scope="col" className="px-3 py-2">Slug</th>
                            <th scope="col" className="px-3 py-2">Descripción</th>
                            <th scope="col" className="px-3 py-2">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            items.map((item) => (
                                <tr key={item.slug} className="text-justify ">
                                    <td className="p-2">{item.nombre}</td>
                                    <td className="p-10 w-40">$ {item.precio.toLocaleString()}</td>
                                    <td className="p-2">{item.stock}</td>
                                    <td className="p-2">{item.categoria}</td>
                                    <td className="p-2">
                                        <Image
                                            src={item.imagen}
                                            alt={item.nombre}
                                            width={300}
                                            height={300}
                                            className="hover:scale-110"
                                        />
                                    </td>
                                    <td className="p-2">{item.slug}</td>
                                    <td className="p-2 max-w-prose">{item.descripcion}</td>
                                    <td className="p-2">
                                        <div className="flex justify-center items-center gap-2">
                                            <Link
                                                href={`/admin/edit/${item.slug}`}
                                            // className="rounded bg-green-400 p-2 text-white"
                                            >
                                                <Image
                                                    src={Editar}
                                                    alt="Icono editar"
                                                    width={30}
                                                    height={30}
                                                />
                                            </Link>

                                            <Link
                                                href={`/admin/delete/${item.slug}`}
                                            // className="rounded bg-red-400 p-2 text-white"
                                            >
                                                <Image
                                                    src={Eliminar}
                                                    alt="Icono eliminar"
                                                    width={30}
                                                    height={30}
                                                />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default ProductsTable