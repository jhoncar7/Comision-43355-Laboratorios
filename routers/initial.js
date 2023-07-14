import { Router } from 'express';
import { obtenerProductosPaginadosSocket } from '../controllers/productos.js';

const router = Router();

router.get('/products', async (req, res) => {
    const p = await obtenerProductosPaginadosSocket();
    return res.render('productos', { productos: p.productos })
});

router.get('/real-time-products', async (req, res) => {
    const p = await obtenerProductosPaginadosSocket();
    return res.render('productos-real-time', { productos: p.productos })
});

router.get('*', (req, res) => {
    return res.render('404');
});

export default router;