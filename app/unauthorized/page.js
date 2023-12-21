import Retornar from '@/components/ui/Retornar'

export default function UnauthorizedPage() {   

    return (
        <>
            <main className="container m-auto">
                <h1 className="text-4xl text-blue-600 my-4">No tiene permisos de Administrador.</h1>
                <hr />
               
                <Retornar>
                    Volver
                </Retornar>
            </main>
        </>
    )
}