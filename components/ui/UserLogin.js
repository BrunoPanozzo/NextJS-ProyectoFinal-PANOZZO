'use client'

import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "../admin/LogoutButton";
import { useRouter } from "next/navigation";

const UserLogin = () => {

    const { user } = useAuthContext()

    const router = useRouter()

    var href = ""

    user.logged && user.email === "admin@coder.com"
        ?
        href = "/admin"
        :
        user.logged
            ?
            href = "/unauthorized"
            :
            href = "/admin"

    return (
        <div className="sticky top-0">
            <Link className="flex flex-row" href={href}>
                <Image className="align-middle text-center font-normal py-1 px-3 leading-normal btn-ligth relative"
                    src={"/imgs/NavBar/login.png"}
                    alt='User LogIn'
                    width={70}
                    height={40}
                />
                {user.nombre
                    ?
                    <span className="text-left font-semibold text-base ml-0 rounded-full py-4 px-4 bg-blue-600">HOLA, {user.nombre}</span>
                    :
                    <></>
                }
            </Link>
        </div>
    )
}

export default UserLogin


