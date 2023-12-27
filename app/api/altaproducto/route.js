import { NextResponse } from "next/server";
import { db, storage } from '@/firebase/config' 
import { doc, setDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

function altaProducto(docRef, productData ) {
    setDoc(docRef, {
        ...productData
        // image: fileURL
    }).then(() => console.log("Producto creado exitosamente"))
    return NextResponse.json(productData)
}

export async function POST(request) {
  
    // const productData = await request.json()
    const productData = request.body.values
    const file = request.body.file

    // console.log(productData);
    // console.log(request);

    // const storageRef = ref(storage, productData.slug)
    // const fileSnapshot = await uploadBytes(storageRef, file)

    // const fileURL = await getDownloadURL( fileSnapshot.ref )

    // const docRef = doc(db, "productos", productData.slug)
    // productData.precio = parseInt(productData.precio)
    // productData.stock = parseInt(productData.stock)
    // return altaProducto(docRef, productData)   
    return NextResponse.json("Producto creado exitosamente")
}