'use client'

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext([])

export const useAuthContext = () => useContext(AuthContext)

export function AuthProvider({ children }) {

    const [user, setUser] = useState({
        logged: false,
        email: null,
        uid: null
    })

    // return (<AuthContext.Provider value={{
    //     user,
    //     createUser,
    //     loginUser,
    //     logout
    // }}>
    //     {children}
    // </AuthContext.Provider>

    return (<AuthContext.Provider value={{
        user
    }}
    >
        {children}
    </AuthContext.Provider>
    )

}