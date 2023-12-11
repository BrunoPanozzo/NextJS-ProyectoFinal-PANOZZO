import Image from "next/image"
import Link from "next/link"
import Eliminar from "@/public/icons/borrar.png"
import Editar from "@/public/icons/editar.png"

const Producto = ({ item, mostrarBotones }) => {

    const ref = !mostrarBotones ? `/tienda/detail/` + item.slug : ''

    return (
        <article className="basis-72 shadow-lg rounded">
            <Link href={ref}
                className="flex flex-col"
            >
                <Image
                    alt={item.nombre}
                    src={`/imgs/productos/${item.imagen}`}
                    width={300}
                    height={300}
                    style={{ objectFit: "contain" }}
                />

                <div className="px-4 border-t border-gray-200 flex-auto p-6 text-center">
                    <h4 className="text-1xl my-4 py-3 px-6 mb-3 bg-gray-200 border-b-1 border-gray-300 text-gray-900">{item.nombre}</h4>
                    <p className="text-2xl font-semibold mb-6">$ {item.precio.toLocaleString()}</p>
                    {
                        mostrarBotones ? <div className="flex justify-center items-center gap-2">
                            <Image
                                src={Editar}
                                alt="Icono editar"
                                width={30}
                                height={30}
                            />
                            <Image
                                src={Eliminar}
                                alt="Icono eliminar"
                                width={30}
                                height={30}
                            />
                        </div>
                            : <Link href={ref} className="text-sm align-middle text-center border rounded-2xl py-2 px-6 bg-gray-600 text-white hover:bg-[#3535da]">Ver detalle</Link>
                    }
                </div>
            </Link>
        </article >
    )
}

export default Producto