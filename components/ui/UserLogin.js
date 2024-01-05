'use client'

import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

const UserLogin = () => {

    const { user } = useAuthContext()

    const nombreUsuario = user.nombre      

    return (
        <div className="sticky top-0">
            <Link className="flex flex-row" href="/admin">  
                <Image className="align-middle text-center font-normal py-1 px-3 leading-normal btn-ligth relative"
                    src={"/imgs/NavBar/login.png"}
                    alt='User LogIn'
                    width={70}
                    height={40}
                />
                {nombreUsuario
                    ?
                    <span className="text-left font-semibold text-base ml-0 rounded-full py-4 px-4 bg-blue-600">HOLA, {nombreUsuario}</span>
                    :
                    <></>
                }
            </Link>
        </div>
    )
}

export default UserLogin


