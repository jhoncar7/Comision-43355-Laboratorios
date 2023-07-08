import { response, request } from 'express';
import Cart from '../models/carts.js';
import Producto from '../models/productos.js';

export const cartsPaginados = async (req = request, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;

        const [cart, total] = await Promise.all([
            Cart.find()
                .skip(Number(desde))
                .limit(Number(limite)),
            Cart.countDocuments()]);

        return res.json({ total, cart });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, msg: 'Hable con un administrador' });
    }

}
export const obtenerCart = async (req = request, res = response) => {
    try {
        const { id } = req.params

        const cart = await Cart.findById(id);
        if (!cart)
            return res.status(404).json({ status: false, msg: `El producto con id:${id} no existe` })

        return res.json({ status: true, cart })
    } catch (error) {
        return res.status(500).json({ status: false, msg: 'Hable con un administrador' })
    }

}

export const crearCart = async (req = request, res = response) => {
    try {
        const cart = new Cart();
        if (cart) {
            await cart.save();
            return res.status(201).json({ status: true, cart });
        }
        return res.status(404).json({ ok: false });
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ ok: false, msg: 'Hablar con un administrador' });
    }
}

export const actualizarCart = async (req = request, res = response) => {
    try {
        const { id, pid } = req.params;

        const cart = await Cart.findById(id);

        if (cart) {
            const producto = await Producto.findById(pid);

            if (producto) {
                const existeProducto = cart.products.find(item => item.id.toString() === pid);
                if (existeProducto)
                    existeProducto.quantity++;
                else
                    cart.products.push({ id: producto._id, quantity: 1 });

                await cart.save();

                return res.json({ status: true, cart })

            } else
                return res.status(404).json({ status: false, msg: `El prodicto con id ${id} no existe` });

        }

        return res.status(404).json({ status: false, msg: `El carrito con id ${id} no existe` });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, msg: 'Hable con un administrador' });
    }
}