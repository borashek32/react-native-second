import firebase from "firebase/compat"
import {getFirestore} from "@firebase/firestore"
import initializeApp = firebase.initializeApp
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where} from "firebase/firestore"
import {ProductInCartType} from "../../components/cart/cart.types"
import {ProductType} from "../../components/shop/products.types"
import {Alert} from "react-native"


const firebaseConfig = {
  apiKey: "AIzaSyCPHK8YWUfB85Wl49YtkOXcE9Ui6gsq9AE",
  authDomain: "second-7d3c5.firebaseapp.com",
  projectId: "second-7d3c5",
  storageBucket: "second-7d3c5.appspot.com",
  messagingSenderId: "560263516843",
  appId: "1:560263516843:web:c1fb05dc9480fd9ad51dee"
}


let app
if (firebase.apps.length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}
const db = getFirestore(app)
const auth = firebase.auth()
export { auth, db }


export const  getAllProducts = async () => {
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

export const addProductToCart = async (product: ProductType, userUid: string) => {
  const cartCollectionRef = collection(db, 'cart');

  const q = query(cartCollectionRef, where('uid', '==', product.uid), where('userUid', '==', userUid));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    const newProductInCart: ProductInCartType = {
      uid: product.uid,
      title: product.title,
      price: product.price,
      priceForOneItem: product.price,
      quantity: 1,
      userUid: userUid
    };

    await addDoc(cartCollectionRef, newProductInCart);
  } else {

    const docToUpdate = querySnapshot.docs[0];
    const updatedQuantity = docToUpdate.data().quantity + 1;
    const updatedPrice = docToUpdate.data().priceForOneItem * updatedQuantity

    await updateDoc(doc(db, 'cart', docToUpdate.id), { quantity: updatedQuantity, price: updatedPrice });
  }
};

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
        priceForOneItem: data.price,
        quantity: data.quantity,
        userUid: data.userUid,
      }
    })
  return { productsInCart }
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
      priceForOneItem: cartItemData.priceForOneItem,
      quantity: cartItemData.quantity + 1,
      price: cartItemData.priceForOneItem * (cartItemData.quantity + 1)
    }

    const cartItemDocRef = doc(cartCollection, cartItemDoc.id)
    await updateDoc(cartItemDocRef, updatedCartItemData)

    return updatedCartItemData;
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
      quantity: (cartItemData.quantity > 1) ? cartItemData.quantity - 1 : cartItemData.quantity,
      price: (cartItemData.quantity === 1) ? cartItemData.price : cartItemData.priceForOneItem * (cartItemData.quantity - 1)
    }

    const cartItemDocRef = doc(cartCollection, cartItemDoc.id)
    await updateDoc(cartItemDocRef, updatedCartItemData)

    return updatedCartItemData;
  }
}

export const removeCartItem = async (itemUid: string, userUid: string) => {
  const cartCollectionRef = collection(db, 'cart')
  const q = query(cartCollectionRef, where('uid', '==', itemUid), where('userUid', '==', userUid));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return { cartItems: [] };
  }

  const docToDelete = querySnapshot.docs[0];
  await deleteDoc(doc(docToDelete.ref.parent, docToDelete.id));

  const updatedQuerySnapshot = await getDocs(q);
  const updatedCartItems = updatedQuerySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
  return { productsInCart: updatedCartItems };
};