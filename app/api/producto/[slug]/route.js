import { NextResponse } from 'next/server'
import { db } from '@/firebase/config'
import { doc, getDoc, onSnapshot } from "firebase/firestore"

export async function GET(_, { params }) {
    const { slug } = params

    const docRef = doc(db, "productos", slug)
    const docSnapshot = await getDoc(docRef)
    return NextResponse.json(docSnapshot.data())
}