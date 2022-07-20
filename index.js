var express = require('express');
const cors = require('cors');
const db = require('./config');
const middleware = require('./middleware');

const app = express();
app.use(express.json());
app.use(cors());
app.use(middleware.decodeToken);
const PORT = process.env.PORT || 4000

app.get("/api", async (req, res) => {
    const snapshot = await db.products.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(list);
});

const productRouter = require('./routes/products');
app.use("/api/products", productRouter);

const orderRouter = require('./routes/orders');
app.use("/api/orders", orderRouter);

const cartRouter = require('./routes/carts');
app.use("/api/carts", cartRouter);


app.listen(PORT, () => console.log("Up & Running *4000"));