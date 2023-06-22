import {ProductType} from "../shop/products.types"
import {addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where} from "firebase/firestore"
import {ProductInCartType} from "./cart.types"
import {db} from "../../common/api/firebase"

export const addProductToCart = async (product: ProductType, userUid: string) => {
  const cartCollectionRef = collection(db, 'cart')
  const qCartCollection = query(cartCollectionRef, where('uid', '==', product.uid), where('userUid', '==', userUid))
  const querySnapshot = await getDocs(qCartCollection)

  if (querySnapshot.empty) {
    const newProductInCart: ProductInCartType = {
      uid: product.uid,
      title: product.title,
      price: product.price,
      priceForOneItem: product.price,
      quantity: 1,
      userUid: userUid,
      totalQuantity: product.quantity
    }

    await addDoc(cartCollectionRef, newProductInCart)
  } else {

    const docToUpdate = querySnapshot.docs[0]
    const updatedQuantity = docToUpdate.data().quantity + 1
    const updatedPrice = docToUpdate.data().priceForOneItem * updatedQuantity

    await updateDoc(doc(db, 'cart', docToUpdate.id), { quantity: updatedQuantity, price: updatedPrice })
  }
}

export const getUserCartProducts = async (userUid: string) => {
  const productsCollection = collection(db, 'cart')
  const querySnapshot = await getDocs(productsCollection)

  const productsInCart: ProductInCartType[] = querySnapshot.docs
    .filter((doc) => doc.get('userUid') === userUid)
    .map((doc) => {
      const data = doc.data()
      return {
        uid: data.uid,
        title: data.title,
        price: data.price,
        priceForOneItem: data.priceForOneItem,
        quantity: data.quantity,
        userUid: data.userUid,
        totalQuantity: data.totalQuantity
      }
    })

  let totalQuantity: number = 0
  let totalPrice: number = 0

  productsInCart.forEach(product => {
    totalQuantity += product.quantity
    totalPrice += product.price
    return { totalQuantity, totalPrice }
  })

  return { productsInCart, cartInfo: {
      productsTotalQuantity: totalQuantity,
      productsTotalPrice: totalPrice
    }}
}

export const incrementCartItemQuantity = async (itemUid: string) => {
  const cartCollection = collection(db, 'cart')
  const cartItemQuerySnapshot = await getDocs(cartCollection)

  const cartItemDoc = cartItemQuerySnapshot.docs
    .find((doc) => doc.get('uid') === itemUid)

  if (cartItemDoc) {
    const cartItemData = cartItemDoc.data()

    const updatedCartItemData: ProductInCartType = {
      ...cartItemData,
      uid: cartItemData.uid,
      userUid: cartItemData.userUid,
      title: cartItemData.title,
      totalQuantity: cartItemData.totalQuantity, // все товары в магазине
      priceForOneItem: cartItemData.priceForOneItem,
      quantity: cartItemData.quantity, // товары в корзине
      price: cartItemData.priceForOneItem * cartItemData.quantity
    }

    const cartItemDocRef = doc(cartCollection, cartItemDoc.id)
    await updateDoc(cartItemDocRef, updatedCartItemData)

    return updatedCartItemData
  }
}

export const decrementCartItemQuantity = async (itemUid: string) => {
  const cartCollection = collection(db, 'cart')
  const cartItemQuerySnapshot = await getDocs(cartCollection)

  const cartItemDoc = cartItemQuerySnapshot.docs
    .find((doc) => doc.get('uid') === itemUid)

  if (cartItemDoc) {
    const cartItemData = cartItemDoc.data()

    const updatedCartItemData: ProductInCartType = {
      ...cartItemData,
      uid: cartItemData.uid,
      userUid: cartItemData.userUid,
      title: cartItemData.title,
      priceForOneItem: cartItemData.priceForOneItem,
      totalQuantity: cartItemData.totalQuantity, // все товары в магазине
      quantity: cartItemData.quantity, // товары в корзине
      price: cartItemData.priceForOneItem * cartItemData.quantity
    }

    const cartItemDocRef = doc(cartCollection, cartItemDoc.id)
    await updateDoc(cartItemDocRef, updatedCartItemData)

    return updatedCartItemData
  }
}

export const removeCartItem = async (itemUid: string, userUid: string) => {
  const cartCollectionRef = collection(db, 'cart')
  const q = query(cartCollectionRef, where('uid', '==', itemUid), where('userUid', '==', userUid))

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return { cartItems: [] }
  }

  const docToDelete = querySnapshot.docs[0]
  await deleteDoc(doc(docToDelete.ref.parent, docToDelete.id))

  const updatedQuerySnapshot = await getDocs(q)
  const updatedCartItems = updatedQuerySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }))
  return { productsInCart: updatedCartItems }
}