'use client'

import { useAuthContext } from "@/context/AuthContext"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavBarItem = ({enlace}) => {

    const pathname = usePathname()
    const { user } = useAuthContext()

    var ref = ""
    if (enlace.label === "Mis Compras")
    {
        if (user.logged)
            ref = `/orders/` + user.email
        else
            ref = `/orders/`
    }
    else
        ref = enlace.href

    return (
        <Link
            key={enlace.label}
            // href={enlace.href}
            href={ref}
            className={`${pathname === enlace.href ? 'text-blue-600 font-semibold' : ' text-white p-3 font-semibold no-underline'} text-xl m-4 hover:text-blue-600 hover:bg-transparent hover:font-bold`}
        >
            {enlace.label}
        </Link>
    )
}

export default NavBarItem