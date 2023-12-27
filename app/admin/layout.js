'use client'

import { useAuthContext } from "@/context/AuthContext"

const AdminLayout = ({ children, login }) => {

    const { user } = useAuthContext()     

    return (
        <div>
            {
                user.logged
                    ? children
                    : login
            }
        </div>
    )
}

export default AdminLayout