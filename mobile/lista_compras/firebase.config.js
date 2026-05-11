// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCui8LOdEJxNyWSNGpK4u7g9YHD-6LqNuY",
    authDomain: "listacompras20263a.firebaseapp.com",
    projectId: "listacompras20263a",
    storageBucket: "listacompras20263a.firebasestorage.app",
    messagingSenderId: "399313250832",
    appId: "1:399313250832:web:cbc47aad729bdc48c9b895",
    measurementId: "G-EEPVLLF9WR"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app)