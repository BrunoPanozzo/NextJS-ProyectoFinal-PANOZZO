'use client'

import { useAuthContext } from "@/context/AuthContext"
import Boton from "../ui/Boton"

const LogoutButton = () => {

    const { logout } = useAuthContext()

    return <Boton onClick={logout} className="flex justify-between items-center ml-auto font-mono text-lg my-4 align-middle text-center border rounded-2xl py-2 px-6 bg-red-600 text-white hover:bg-red-800">Cerrar sesión</Boton>
}

export default LogoutButton
