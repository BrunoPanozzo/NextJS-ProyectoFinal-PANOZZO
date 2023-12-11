// import { mockData } from '@/data/productos'
import Producto from './Producto'
import Boton from '../ui/Boton'

const getProductos = async (categoria) => {
    
    const response = await await fetch(`http://localhost:3000/api/productos/${categoria}`,{cache: 'no-cache'})

    if (!response.ok)
        throw new Error("Falló la obtención de los productos.")

    return response.json()
}

const ListaProductos = async ({ categoria, mostrarBotones }) => {   

    const items = await getProductos(categoria);
    
    return (
        <>
            {mostrarBotones ? <Boton className="flex justify-between items-center ml-auto font-mono text-lg my-4">
                                Crear nuevo
                              </Boton>
                : <></>
            }
            <section className="container m-auto flex justify-center items-center gap-12 flex-wrap">
                {
                    items.map(item => <Producto key={item.slug} item={item} mostrarBotones={mostrarBotones}/>)
                }                  
            </section>
        </>        
    )
}
export default ListaProductos