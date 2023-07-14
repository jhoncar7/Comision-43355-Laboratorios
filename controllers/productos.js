import { response, request } from 'express';
import Producto from '../models/productos.js';

export const productosPaginados = async (req = request, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [productos, total] = await Promise.all([
            Producto.find(query)
                .skip(Number(desde))
                .limit(Number(limite)),
            Producto.countDocuments(query)]);

        return res.json({ total, productos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, msg: 'Hable con un administrador' });
    }

}

export const obtenerProducto = async (req = request, res = response) => {
    try {
        const { id } = req.params

        const producto = await Producto.findById(id);
        if (!producto)
            return res.status(404).json({ status: false, msg: `El producto con id:${id} no existe` })

        return res.json({ status: true, producto })
    } catch (error) {
        return res.status(500).json({ status: false, msg: 'Hable con un administrador' })
    }

}

export const crearProducto = async (req = request, res = response) => {

    try {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        // despues seria bueno implementar [npm i express-validator] como middleware para validar cada campo
        if (!title, !description, !code, !price, !stock, !category)
            return res.status(404).json({ msg: 'los campos [title,description,code,price,stock,category] son oblogatorios' })

        const producto = new Producto({ title, description, code, price, status, stock, category, thumbnails });

        if (producto) {
            await producto.save();
            return res.status(201).json({ status: true, producto });
        }

        return res.status(404).json({ ok: false });
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ ok: false, msg: 'Hablar con un administrador' });
    }
}

export const actualizarProducto = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;
        const dataProducto = {};

        for (const key in req.body) {
            const value = req.body[key];
            if (value !== undefined && value !== null && value !== '') {
                dataProducto[key] = value;
            }
        }

        const producto = await Producto.findByIdAndUpdate(id, { ...dataProducto }, { new: true });

        if (producto)
            return res.json({ status: true, producto })

        return res.status(404).json({ status: false });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, msg: 'Hable con un administrador' });
    }
}

export const eliminarProducto = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findOneAndDelete({ _id: id });

        if (producto)
            return res.json({ status: true, producto })

        return res.status(404).json({ status: false });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, msg: 'Hable con un administrador' });
    }
}

export const obtenerProductosPaginadosSocket = async (limite = 20, desde = 0) => {
    const query = { status: true };
  
    const [productos, total] = await Promise.all([
      Producto.find(query)
        .skip(Number(desde))
        .limit(Number(limite)),
      Producto.countDocuments(query)
    ]);
  
    return { total, productos };
  };
  