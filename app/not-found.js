import Retornar from '@/components/ui/Retornar'

export default function NotFound() {   

    return (
        <>
            <main className="container m-auto">
                <h1 className="text-4xl text-blue-600 my-4">La página solicitada no está disponible</h1>
                <hr />
                <p className="text-base mt-4">Disculpe, tenemos problemas para procesar su solicitud.</p>
                <p className="text-base mt-4">Es posible que esté usando una dirección antigua o el vínculo no se encuentre disponible.</p>

                <Retornar>
                    Volver
                </Retornar>
            </main>
        </>
    )
}