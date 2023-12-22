import EditForm from "@/components/admin/EditForm"

const getProducto = async (slug) => {

    const response = await fetch(`http://localhost:3000/api/producto/${slug}`,{ cache: "no-store" })

    if (!response.ok)
        throw new Error("Falló la obtención del producto.")

    return response.json()
}

const EditPage = async ({params}) => {

    const { slug } = params

    const producto = await getProducto(slug)

    return (
        <div>
            <EditForm producto={producto}></EditForm>
        </div>
    )
}

export default EditPage