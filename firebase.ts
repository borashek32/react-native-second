// Import the functions you need from the SDKs you need
import firebase from "firebase/compat"
import initializeApp = firebase.initializeApp
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPHK8YWUfB85Wl49YtkOXcE9Ui6gsq9AE",
  authDomain: "second-7d3c5.firebaseapp.com",
  projectId: "second-7d3c5",
  storageBucket: "second-7d3c5.appspot.com",
  messagingSenderId: "560263516843",
  appId: "1:560263516843:web:c1fb05dc9480fd9ad51dee"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };