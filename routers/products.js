import { Router } from 'express';
import {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    obtenerProducto,
    productosPaginados
} from '../controllers/productos.js';

const router = Router();

router.get('/', productosPaginados);
router.get('/:id', obtenerProducto);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

export default router;