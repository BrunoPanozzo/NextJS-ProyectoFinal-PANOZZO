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

    const asignarRol = async (email) => {
        if (email != "bapanozzo@hotmail.com") {  //UNICO email con rol de ADMIN
            const docRef = doc(db, "roles", email)
            return setDoc(docRef, {
                email: email,
                rol: "noAdmin"
            }).then(() => console.log("Asigno rol a nuevo usuario"))
        }
    }

    const registerUser = async (values) => {
        await createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(() => {
                asignarRol(values.email)
                console.log("true")
                resolve(true)
            })
            .catch((error) => {
                var errorCode = error.code;
                console.log(errorCode)
                console.log("false")
                reject(false)
            });
    }

    const loginUser = async (values) => {
        await signInWithEmailAndPassword(auth, values.email, values.password)
            // .then(() => {
            //     return true
            // })
            // .catch((error) => {
            //     var errorCode = error.code;
            //     console.log(errorCode)
            //     return false
            // });
    }

    const logout = async () => {
        await signOut(auth)
    }

    const googleLogin = async () => {
        await signInWithPopup(auth, provider)
            .then(() => {
                asignarRol(auth.currentUser.email)
                // return true
            })
            // .catch((error) => {
            //     var errorCode = error.code;
            //     console.log(errorCode)
            //     return false
            // });
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
    }, [router])

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