import {collection, getDocs} from "firebase/firestore"
import {ProductType} from "./products.types"
import {db} from "../../common/api/firebase"


export const getAllProducts = async () => {
  const productsCollection = collection(db, 'products')
  const querySnapshot = await getDocs(productsCollection)

  const products: ProductType[] = querySnapshot.docs.map((doc) => {
    const product: ProductType = {
      uid: doc.id,
      title: doc.get('title'),
      price: doc.get('price'),
      quantity: doc.get('quantity'),
      img: doc.get('img'),
      desc: doc.get('desc')
    }
    return product
  })
  return { products }
}