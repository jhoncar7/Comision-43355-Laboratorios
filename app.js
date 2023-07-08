import express from 'express';
import hbs from 'hbs';
import products from './routers/products.js';
import carts from './routers/carts.js';
import initial from './routers/initial.js';
import __dirname from './utils/dirname.js';
import { obtenerProductosPaginadosSocket } from './controllers/productos.js'
import 'dotenv/config.js';

import { Server } from 'socket.io'
import { dbConnection } from './data/config.js';

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.json());

app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/', initial);

await dbConnection();

const httpServer = app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});

const io = new Server(httpServer);

io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('disconnect', () => {
        console.log('El cliente se ha desconectado');
    })

    const { productos } = await obtenerProductosPaginadosSocket(20);

    socket.emit('productos', productos);

    socket.on('productos', (idProducto) => {
        console.log({ idProducto });
        p.deleteProduct(parseInt(idProducto));
        socket.emit('productos', p.getProduct());
    });
});