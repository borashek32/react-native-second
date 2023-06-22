import firebase from "firebase/compat"
import {getFirestore} from "@firebase/firestore"
import initializeApp = firebase.initializeApp


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

export { db }