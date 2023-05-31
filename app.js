import express from 'express';
import ProductManager from "./productos.js";

const app = express();
const port = 3000;

const productos = new ProductManager('./data/productos.json');

app.get('/', function (req, res) {
    return res.send('Solución laboratorio 3')
});

app.get('/products', (req, res) => {
    const { limit } = req.query;
    const p = productos.getProduct();
    let cantProductos;
    if (limit)
        cantProductos = p.slice(0, limit)
    else
        cantProductos = p;
    return res.json({ cantTotal: p.length, productos: cantProductos });
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params
    return res.json(productos.getProductById(parseInt(id)))
});

app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});