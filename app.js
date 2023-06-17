import express from 'express';
import hbs from 'hbs';
import products from './routers/products.js';
import carts from './routers/carts.js';
import initial from './routers/initial.js';
import __dirname from './utils/dirname.js';
import Productos from './models/productos.js'

import { Server } from 'socket.io'

const app = express();
const port = 8080;

const p = new Productos();

app.use(express.static('public'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.json());

app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/', initial);

const httpServer = app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});

const io = new Server(httpServer);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('disconnect', () => {
        console.log('El cliente se ha desconectado');
    })

    const productos = p.getProduct();

    socket.emit('productos', productos);

    socket.on('productos', (idProducto) => {
        console.log({ idProducto });
        p.deleteProduct(parseInt(idProducto));
        socket.emit('productos', p.getProduct());
    });
});