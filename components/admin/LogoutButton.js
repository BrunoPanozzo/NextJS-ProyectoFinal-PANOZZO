'use client'

import { useAuthContext } from "@/context/AuthContext"
import Boton from "../ui/Boton"

const LogoutButton = ({ children, className, ...args }) => {

    const { user, logout } = useAuthContext()

    return (
        <div>
            {
                user.logged
                    ?
                    <Boton onClick={logout} className={`flex items-center font-mono text-lg my-4 align-middle text-center border rounded-2xl py-2 px-6 bg-red-600 text-white hover:bg-red-800 ${className}`}
                        {...args}>
                        Cerrar Sesión
                    </Boton>
                    :
                    <></>
            }
        </div>
    )
}

export default LogoutButton
