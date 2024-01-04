import Boton from "@/components/ui/Boton"
import InputEmail from "../ui/InputEmail"

const ContactForm = () => {

    return (
        <main className="container m-auto max-w-md">
            <h1 className="text-4xl text-blue-600 my-4 text-center font-mono">Contacto</h1>
            <hr />
            <form className="bg-white px-8 pt-6 pb-8 mb-4 rounded-xl">
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono" for="mensaje"> Mensaje </label>
                    <textarea type="text" className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" rows="5" placeholder="Dejanos un mensaje" required></textarea>
                </div>
                <div className="mb-4">
                    {/* <label className="block text-gray-700 text-lg font-bold mb-2 font-mono" for="email"> Email </label>
                    <input type="email" className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" placeholder="Tu email" required /> */}
                    <InputEmail> Email </InputEmail>
                </div>
                <div className="flex items-center justify-between font-mono text-lg">
                    <Boton type="submit" className="flex justify-between items-center ml-auto font-mono text-lg my-4"> Aceptar </Boton>
                </div>
            </form>
        </main>
    )
}

export default ContactForm