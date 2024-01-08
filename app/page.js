import Image from "next/image";

export const metadata = {
  title: 'Samsung Argentina | Dispositivos Móviles | TV &amp; Audio | Línea Hogar',
  description: '" ¡Bienvenido a Samsung! Descubrí aquí nuestros dispositivos con la tecnología más avanzada: Smart TVs, Celulares, Tablets, Electrodomésticos y mucho más!"',
  keywords: 'Samsung, Samsung Smartphones, Samsung TV, Samsung Electrodomésticos',
}

export default function Home() {

  return (
    <div className="container m-auto mt-6">
      <h1 className="text-6xl text-bold text-blue-600 text-center my-4 font-mono text-shadow-lg mt-10 border-b border-blue-950 pb-4">Samsung Argentina</h1>
      <h2 className="text-5xl text-center font-mono text-shadow-lg mt-20 mb-10">Bienvenidos a la Tienda Online Samsung !</h2>
      <div className="flex justify-center align-middle m-10">
        <Image
          alt="Envío gratis"
          src="/icons/envio.webp"
          width={50}
          height={50}
          style={{ objectFit: "contain" }}
        />
        <p className="text-4xl font-bold text-center mt-6 font-mono text-shadow-lg pb-6">
          Envío Gratis en todos los productos
        </p>
      </div>
      <div className="flex justify-center align-middle m-10">
        <Image
          alt="Seguimiento 24hs"
          src="/icons/24hs.png"
          width={50}
          height={50}
          style={{ objectFit: "contain" }}
        />
        <p className="text-4xl font-bold text-center mt-6 font-mono text-shadow-lg pb-6">
          Seguimiento en línea
        </p>
      </div>
      <div className="flex justify-center align-middle m-10">
        <Image
          alt="Cuotas con tarjeta"
          src="/icons/tarjeta.webp"
          width={50}
          height={50}
          style={{ objectFit: "contain" }}
        />
        <p className="text-4xl font-bold text-center mt-6 font-mono text-shadow-lg pb-6">
          Hasta 6 cuotas sin interés
        </p>
      </div>
      <div className="flex justify-center align-middle m-10">
        <Image
          alt="Plan canje"
          src="/icons/canje.webp"
          width={50}
          height={50}
          style={{ objectFit: "contain" }}
        />
        <p className="text-4xl font-bold text-center mt-6 font-mono text-shadow-lg pb-6">
          Plan Canje Samsung!
        </p>
      </div>
    </div>
  )
}
