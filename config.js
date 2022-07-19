const firebase = require('firebase');

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_PUBLIC_KEY,
    authDomain: "fir-auth-ecommerce-9b085.firebaseapp.com",
    projectId: "fir-auth-ecommerce-9b085",
    storageBucket: "fir-auth-ecommerce-9b085.appspot.com",
    messagingSenderId: "282818523080",
    appId: "1:282818523080:web:5a80205ec1b60759b7dafd",
    measurementId: "G-9ZBZWHQ0YD"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const products = db.collection("products");
const orders = db.collection("orders");
module.exports = { products: products, orders: orders };
