import DetalleProducto from "@/components/productos/DetalleProducto"
import { Suspense } from "react"
import Loading from "./loading"

const DetailPage = ({ params }) => {
    
    const { slug } = params

    return (
        <main className="container m-auto mt-10">
            <Suspense fallback={<Loading texto={`Cargando ${slug}...`} />}>
                <DetalleProducto slug={slug} />
            </Suspense>
        </main>
    )
}

export default DetailPage