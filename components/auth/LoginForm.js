'use client'

import { useState } from "react"
import Boton from "../ui/Boton"
import { useAuthContext } from "@/context/AuthContext"
import Link from "next/link"
import InputText from "../ui/InputText"
import InputEmail from "../ui/InputEmail"
import Swal from "sweetalert2";

const LoginForm = () => {

    const { registerUser, loginUser, googleLogin } = useAuthContext()
    const [values, setValues] = useState({
        nombre: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    //función para validar el nombre, solo permite letras y el caracter de espacio vacío
    const validarNombre = (nombre) => {
        return /^[a-z A-Z]+$/.test(nombre)
    }

    //función para validar un email
    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const userValid = () => {
        return validarNombre(values.nombre) && validarEmail(values.email)
    }

    return (
        <div className="fixed w-screen h-screen inset-0 z-10 flex justify-center items-center bg-blue-400 bg-opacity-25">
            <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4 rounded-xl w-1/3">
                <h2 className="mb-5">Login</h2>
                <div className="mb-4">
                    {/* <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Nombre: </label>
                    <input type="text" value={values.nombre} name="nombre" onChange={handleChange} required placeholder="Tu nombre"
                        className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" /> */}
                    <InputText value={values.nombre} name="nombre" onChange={handleChange} placeholder="Tu nombre" >Nombre: </InputText>
                </div>
                <div className="mb-4">
                    {/* <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Email: </label>
                    <input type="email" value={values.email} name="email" onChange={handleChange} required placeholder="Tu email"
                        className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" /> */}
                    <InputEmail value={values.email} name="email" onChange={handleChange} >Email: </InputEmail>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 font-mono">Password: </label>
                    <input type="password" value={values.password} name="password" onChange={handleChange} required placeholder="Tu password"
                        className="w-full shadow border border-blue-100 rounded py-2 px-3 text-gray-700 font-mono" />
                </div>

                <Boton onClick={() => loginUser(values)} className="ml-4">Ingresar</Boton>
                <Boton onClick={() => {
                    userValid()
                        ?
                        registerUser(values)
                        :
                        Swal.fire({
                            title: 'Ingresó un dato inválido.',
                            icon: 'warning',
                            text: 'Corriga el dato para poder registrarse.'
                        })
                }} className="ml-4">Registrarme</Boton>
                <Boton onClick={googleLogin} className="ml-4 ">Ingresar con Google</Boton>
                <Link href="/" className="rounded-lg ml-4 py-2 px-4 bg-blue-400 text-white text-center hover:bg-[#3535da]">Salir</Link>
            </form>
        </div >
    )
}

export default LoginForm