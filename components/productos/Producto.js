import Image from "next/image"
import Link from "next/link"

const Producto = ({ item }) => {

    const ref = `/tienda/detail/` + item.slug

    return (
        <article className="basis-72 shadow-lg rounded">
            <Link href={ref}
                className="flex flex-col"
            >
                <Image
                    alt={item.nombre}
                    src={item.imagen}
                    width={300}
                    height={300}
                    style={{ objectFit: "contain" }}
                />
                <div className="px-4 border-t border-gray-200 flex-auto p-6 text-center">
                    <h4 className="text-1xl my-4 py-3 px-6 mb-3 bg-gray-200 border-b-1 border-gray-300 text-gray-900">{item.nombre}</h4>
                    <p className="text-2xl font-semibold mb-6">$ {item.precio.toLocaleString()}</p>
                    <Link href={ref} className="text-sm align-middle text-center border rounded-2xl py-2 px-6 bg-gray-600 text-white hover:bg-[#3535da]">Ver detalle</Link>
                </div>
            </Link>
        </article >
    )
}

export default Producto