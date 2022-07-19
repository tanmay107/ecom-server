var express = require('express');
const cors = require('cors');
const db = require('./config');

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", async (req, res) => {
    const snapshot = await db.products.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(list);
});

// app.post("/create", async (req, res) => {
//     const data = req.body;
//     await db.products.add({ data });
//     res.send({ msg: "product Added" });
//   });

// app.get("/orders", async (req, res) => {
//     const snapshot = await db.orders.get();
//     const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     res.send(list);
// })

const productRouter = require('./routes/products');
app.use("/products", productRouter);

const orderRouter = require('./routes/orders');
app.use("/order", orderRouter);


app.listen(4000, () => console.log("Up & Running *4000"));