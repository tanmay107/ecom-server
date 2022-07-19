const express = require('express');
const db = require('../config');
const router = express.Router();

router.get("/", async (req, res) => {
    const snapshot = await db.orders.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
});

router.post("/create", async (req, res) => {
    const data = req.body;
    await db.products.add({ data });
    res.send({ msg: "product Added" });
})

module.exports = router;