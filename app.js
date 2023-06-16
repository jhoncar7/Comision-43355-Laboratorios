import express from 'express';
import hbs from 'hbs';
import products from './routers/products.js'
import { Server } from "socket.io";
import carts from './routers/carts.js'
import __dirname from './utils/dirname.js';
import initial from './routers/init.js';


// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
const port = 8080;
// const server = http.createServer(app);
// const io = new Server(server);

app.use(express.static('public'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.json());

app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/', initial)

// app.get('*', (req, res) => {
//     return res.render('404');
// });

const httpServer = app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});

const io = new Server(httpServer);

// server.listen(port, () => {
//     console.log(`Corriendo en el puerto ${port}`);
// });

io.on('connection', socket => {
    console.log('nuevo cliente conectado');
})