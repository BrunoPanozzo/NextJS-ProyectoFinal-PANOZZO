'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, provider } from '@/firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const AuthContext = createContext([])

export const useAuthContext = () => useContext(AuthContext)

export function AuthProvider({ children }) {

    const router = useRouter()

    const [user, setUser] = useState({
        logged: false,
        email: null,
        uid: null
    })

    const crearRol = async (email) => {
        const docRef = doc(db, "roles", email)
        return setDoc(docRef, {
            email: email,
            rol: "noAdmin"
        }).then(() => console.log("Asigno rol a nuevo usuario"))
    }

    const registerUser = async (values) => {
        await createUserWithEmailAndPassword(auth, values.email, values.password)
        crearRol(values.email)
    }

    const loginUser = async (values) => {
        await signInWithEmailAndPassword(auth, values.email, values.password)
    }

    const logout = async () => {
        await signOut(auth)
    }

    const googleLogin = async () => {
        await signInWithPopup(auth, provider)
        crearRol(auth.currentUser.email)
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "roles", user.email)
                const userDoc = await getDoc(docRef)

                if (userDoc.data()?.rol === "admin") {
                    setUser({
                        logged: true,
                        email: user.email,
                        uid: user.uid
                    })
                }
                else {
                    router.push("/unauthorized")
                    logout()
                }
            }
            else {
                setUser({
                    logged: false,
                    email: null,
                    uid: null
                })
            }
        })
    }, [])

    return (<AuthContext.Provider value={{
        user,
        registerUser,
        loginUser,
        logout,
        googleLogin
    }}
    >
        {children}
    </AuthContext.Provider>
    )

}