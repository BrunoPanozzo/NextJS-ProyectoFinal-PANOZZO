import DeleteForm from "@/components/admin/DeleteForm"

const getProducto = async (slug) => {

    try {
        // const response = await fetch(`http://localhost:3000/api/producto/${slug}`, { cache: "no-store" })
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/producto/${slug}`, { cache: "no-store" })

        if (!response.ok)
            throw new Error("Falló la obtención del producto.")

        return response.json()
    }
    catch (error) {
        console.error('Fetch error:', error);
        return null
    }
}

const DeletePage = async ({ params }) => {

    const { slug } = params

    const producto = await getProducto(slug)

    return (
        <div>
            <DeleteForm producto={producto}></DeleteForm>
        </div>
    )
}

export default DeletePage