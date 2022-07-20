const express = require('express');
const { db } = require('../config/firebase-config');
const router = express.Router();

router.get("/", async (req, res) => {
    const productRef = await db.collection("products");
    try{
            productRef.get().then((snapshot) => {
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
        const productsRes = await db.collection('products').add(req.body)
        return res.status(201).json({ "message": "Added" })
    } catch(e) {
        return res.status(500).json({ general: "Something went wrong, please try again"});
    }  
})

module.exports = router;