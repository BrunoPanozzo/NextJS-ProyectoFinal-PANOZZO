import { NextResponse } from 'next/server'
import { db } from '@/firebase/config'
import { doc, getDoc, onSnapshot } from "firebase/firestore"

export async function GET(_, { params }) {

    try {

        const { slug } = params

        const docRef = doc(db, "productos", slug)

        // //Uso onSnapshot para actualizaciones en tiempo real
        // const unsubscribe = onSnapshot(docRef, (doc) => {
        //     const responseData = doc.data()
        //     return NextResponse.json(responseData)
        // })

        const docSnapshot = await getDoc(docRef)

        if (docSnapshot.exists()) {
            return NextResponse.json(docSnapshot.data());
        } else {
            return NextResponse.error(404, 'Product not found');
        }

    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.error(500, 'Internal Server Error');
    }

}