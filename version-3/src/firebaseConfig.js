// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCwDxtdjMyDcsqLAO3GyJioIgO2Gjk7wsE",
    authDomain: "country-api-3043a.firebaseapp.com",
    projectId: "country-api-3043a",
    storageBucket: "country-api-3043a.firebasestorage.app",
    messagingSenderId: "297463227591",
    appId: "1:297463227591:web:96fe6d47c94fbad3c68ae2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
