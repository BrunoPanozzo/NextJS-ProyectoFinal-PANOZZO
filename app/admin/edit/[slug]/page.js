import EditForm from "@/components/admin/EditForm"

const getProducto = async (slug) => {

    try {
        const response = await fetch(`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/producto/${slug}`, { cache: "no-store" })

        if (!response.ok)
            throw new Error("Falló la obtención del producto.")

        return response.json()
    }
    catch (error) {
        console.error('Fetch error:', error);
        return null
    }
}

const EditPage = async ({ params }) => {

    const { slug } = params

    const producto = await getProducto(slug)

    return (
        <div>
            <EditForm producto={producto}></EditForm>
        </div>
    )
}

export default EditPage