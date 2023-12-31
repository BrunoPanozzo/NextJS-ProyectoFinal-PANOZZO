'use client'

import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

const AdminLayout = ({ children, login }) => {

    const { user } = useAuthContext()

    const router = useRouter()

    const soyAdmin = () => {
        return (user.email === "admin@coder.com")
    }

    return (
        <div>
            {
                user.logged
                    ?
                    soyAdmin()
                        ?
                        children
                        :
                        router.push("/unauthorized")
                    : login
            }
        </div>
    )
}

export default AdminLayout