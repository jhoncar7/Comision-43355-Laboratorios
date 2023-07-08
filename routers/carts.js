import { Router } from 'express';
import { actualizarCart, cartsPaginados, crearCart, obtenerCart } from '../controllers/carts.js';

const router = Router();

router.get('/', cartsPaginados);
router.get('/:id', obtenerCart);
router.post('/', crearCart);
router.put('/:id/product/:pid', actualizarCart);


export default router;