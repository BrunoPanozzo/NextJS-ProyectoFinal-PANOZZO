import Image from "next/image"
import styles from './navBar.module.css'
import Link from 'next/link'
import CartWidget from "../cart/CartWidget"
import NavBarItem from "./NavBarItem"

const enlaces = [
    {
        label: "Inicio",
        href: "/"
    },
    {
        label: "Tienda",
        href: "/tienda/todos"
    },
    {
        label: "Nosotros",
        href: "/nosotros"
    },
    {
        label: "Contacto",
        href: "/contacto"
    },
]

const NavBar = () => {

    return (
        <nav className={`${styles.navEncabezado} flex-1 justify-center text-gray-700 text-center bg-gray-400 px-4 py-2`}>
            <Link href={"/"}>
                <Image
                    src={"/imgs/NavBar/logo-brand.png"}
                    alt='Samsung logo'
                    width={200}
                    height={50}
                />
            </Link>

            <div className="flex-initial justify-center items-end text-center px-44 py-2 m-2">
                {
                    enlaces.map(link => {
                        return <NavBarItem enlace={link}/>
                    })
                }
            </div>

            <CartWidget />

        </nav>
    )
}

export default NavBar