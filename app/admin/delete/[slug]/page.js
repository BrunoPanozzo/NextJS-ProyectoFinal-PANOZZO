import DeleteForm from "@/components/admin/DeleteForm"

const getProducto = async (slug) => {

    const response = await fetch(`http://localhost:3000/api/producto/${slug}`,{ cache: "no-store" })

    if (!response.ok)
        throw new Error("Falló la obtención del producto.")

    return response.json()
}

const DeletePage = async ({params}) => {

    const { slug } = params

    const producto = await getProducto(slug)

    return (
        <div>
            <DeleteForm producto={producto}></DeleteForm>
        </div>
    )
}

export default DeletePage