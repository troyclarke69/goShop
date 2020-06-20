import express from 'express';
import data from './data';

const app = express();

app.get('/api/products', (req, res) => {
    res.send(data.products);
})

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    const product = data.products.find(x => x._id === productId );
    if (product)
        res.send(product);
    else
        res.status(404).send({ msg: "Product not found" });
})

app.listen(5000, () => { console.log("Server started on port 5000")});
// note: running 'node backend/server.js' results in error:
// unexpected identifier: import express from 'express'
// Need babel to accomplish this: es6 vs. es5 (node only recognizes es5)
// npm install @babel/cli @babel/core @babel/node @babel/preset-env nodemon --save-dev