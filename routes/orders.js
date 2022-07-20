const express = require('express');
const {db} = require('../config/firebase-config');
const router = express.Router();

router.post("/", async (req, res) => {
    const ordersRef = await db.collection("orders");
    try{
            ordersRef.where('uid', '==', req.body.uid).get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
            console.log(data);
            return res.status(201).json(data);
        })
    } catch (e) {
        return res.status(500).json({ general: "Something went wrong, please try again"});
    }
});

router.post("/create", async (req, res) => {
    try{
        const ordersRes = await db.collection('orders').add(req.body)
        return res.status(201).json({ "message": "Added" })
    } catch(e) {
        return res.status(500).json({ general: "Something went wrong, please try again"});
    }  
})

module.exports = router;

//https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection