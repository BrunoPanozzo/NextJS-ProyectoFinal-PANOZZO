'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const NavBarItem = ({enlace}) => {

    const pathname = usePathname()

    return (
        <Link
            key={enlace.label}
            href={enlace.href}
            className={`${pathname === enlace.href ? 'text-blue-600 font-semibold' : ' text-white p-3 font-semibold no-underline'} text-xl m-4 hover:text-blue-600 hover:bg-transparent hover:font-bold`}
        >
            {enlace.label}
        </Link>
    )
}

export default NavBarItem