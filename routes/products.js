const express = require('express');
const db = require('../config');
const router = express.Router();

router.get("/", async (req, res) => {
    const snapshot = await db.products.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(list);
});

router.post("/create", async (req, res) => {
    const data = req.body;
    await db.products.add({ data });
    res.send({ msg: "product Added" });
})

module.exports = router;