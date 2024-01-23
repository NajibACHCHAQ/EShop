// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyHTVlZgwiZOHfp7bV14Se1LEsroOvBCE",
  authDomain: "e-shop-img.firebaseapp.com",
  projectId: "e-shop-img",
  storageBucket: "e-shop-img.appspot.com",
  messagingSenderId: "284358317849",
  appId: "1:284358317849:web:fc2bd9b29861b065419788"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp