import Image from "next/image";
import Link from "next/link";

const UserLogin = () => {
    
    return (
        <div>
            <Link className="flex flex-row" href={"/admin"}>
                    <Image className="align-middle text-center font-normal py-1 px-3 leading-normal btn-ligth relative"
                        src={"/imgs/NavBar/login.png"}
                        alt='User LogIn'
                        width={70}
                        height={40}
                    />
                    {/* <span id="cantidadProductos" className="absolute p-1 text-center font-semibold text-sm rounded-full py-2 px-4 bg-blue-600">{cantidadArticulosComprados}</span> */}
                </Link>
        </div>
    )
}

export default UserLogin


