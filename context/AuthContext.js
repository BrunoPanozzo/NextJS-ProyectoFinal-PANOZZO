'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, provider } from '@/firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

const AuthContext = createContext([])

export const useAuthContext = () => useContext(AuthContext)

export function AuthProvider({ children }) {

    const router = useRouter()

    const [user, setUser] = useState({
        logged: false,
        nombre: null,
        email: null,
        uid: null
    })

    const asignarRol = async (nombre, email) => {
        console.log(nombre)
        console.log(email)

        if (email != "admin@coder.com") {  //UNICO email con rol de ADMIN
            const docRef = doc(db, "roles", email)
            return setDoc(docRef, {
                nombre: nombre,
                email: email,
                rol: "noAdmin"
            }).then(() => console.log("Asigno rol noAdmin a nuevo usuario"))
        }
        else {
            const docRef = doc(db, "roles", email)
            return setDoc(docRef, {
                nombre: nombre,
                email: email,
                rol: "admin"
            }).then(() => console.log("Asigno rol Admin a nuevo usuario"))
        }
    }

    const registerUser = async (values) => {
        await createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(() => {
                asignarRol(values.nombre, values.email)
                var msje = ""
                if (values.email != "admin@coder.com")
                    msje = "El usuario no posee permisos de Administrador, se encuentra habilitado únicamente para realizar compras en la Tienda."
                else
                    msje = "El usuario posee permisos de Administrador, puede acceder a la sección /admin para administrar los productos de la Tienda."
                Swal.fire({
                    title: 'Usuario registrado con éxito.',
                    icon: 'success',
                    text: msje
                })
            })
            .catch((error) => {
                var errorCode = error.code;

                Swal.fire({
                    title: 'Se produjo un error en la registración.',
                    icon: 'error',
                    text: 'Intente nuevamente o pruebe con otro usuario.'
                })

            });
    }

    const loginUser = async (values) => {
        await signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
            var msje = ""
            if (values.email != "admin@coder.com")
                msje = "El usuario no posee permisos de Administrador, se encuentra habilitado únicamente para realizar compras en la Tienda."
            else
                msje = "El usuario posee permisos de Administrador, puede acceder a la sección /admin para administrar los productos de la Tienda."
            Swal.fire({
                title: 'Ingresó con éxito.',
                icon: 'success',
                text: msje
            })
        })
        .catch((error) => {
            var errorCode = error.code;

            Swal.fire({
                title: 'Se produjo un error en el acceso.',
                icon: 'error',
                text: 'Intente nuevamente o pruebe con otro usuario.'
            })

        });
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
                        nombre: user.nombre,
                        email: user.email,
                        uid: user.uid
                    })
                    console.log(user)
                }
                else {
                    router.push("/unauthorized")
                    logout()
                }
            }
            else {
                setUser({
                    logged: false,
                    nombre: null,
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