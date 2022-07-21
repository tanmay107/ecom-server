const express = require('express');
const { db } = require('../config/firebase-config')
const router = express.Router();

router.post('/', async (req, res) => {
    const cartRef = await db.collection("carts");
    try{
        cartRef.where('uid', '==', req.body.uid).get().then((snapshot) => {
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
})

router.post("/create", async (req, res) => {
    try{
        const cartsRes = await db.collection('carts').add(req.body)
        return res.status(201).json({ message: "Added" })
    } catch(e) {
        return res.status(500).json({ general: "Something went wrong, please try again"});
    }  
})

router.post("/update", async (req, res) => {
    try {
        console.log(req.header('Id'))
        const cartsRes = await db.collection('carts').doc(req.header('Id')).set(req.body, { merge: true });
        console.log("Carts res info ----------------------- ", cartsRes);
        return res.status(201).json({ message: "Updated" })
    } catch (e) {
        return res.status(500).send(e);
    }
})

router.post("/delete", async (req,res) => {
    try{
        const cartsRes = await db.collection('carts').doc(req.body.docid).delete();
        return res.status(201).json({ message : "Deleted" })
    } catch(e) {
        return res.status(500).json({ general: "Something went wrong, please try again"});
    }
})

module.exports = router;
