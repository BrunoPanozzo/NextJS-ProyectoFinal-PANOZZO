import Link from "next/link";

export default function UnauthorizedPage() {   

    return (
        <>
            <main className="container m-auto">
                <h1 className="text-4xl text-blue-600 my-4">No tiene permisos de Administrador.</h1>
                <hr className="mb-6"/>
               
                <Link href="/" className="rounded-lg ml-4 py-2 px-4 bg-blue-400 text-white text-center hover:bg-[#3535da]">Volver</Link>

            </main>
        </>
    )
}