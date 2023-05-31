// const fs = require('fs');

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

export default class ProductManager {

    static #id;
    #products;
    #path

    constructor(path) {
        this.#path = path;
        this.#products = this.#leerArchivo();
        ProductManager.#id = this.#products.length > 0 ? this.#products[this.#products.length - 1].id : 0;
    }

    #leerArchivo() {
        try {
            let data;
            if (existsSync(this.#path))
                data = JSON.parse(readFileSync(this.#path, 'utf-8'));
            else
                data = [];

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    addProduct(title, description, price, img, code, stock) {

        try {
            let mensaje;

            const existeCodigo = this.#products.some(p => p.code === code);

            if (existeCodigo)
                mensaje = `El codigo del producto ${code} ya existe.`;
            else {
                const newProduct = {
                    id: ++ProductManager.#id,
                    title,
                    description,
                    price,
                    img,
                    code,
                    stock,
                };

                if (!Object.values(newProduct).includes(undefined)) {
                    writeFileSync(this.#path, JSON.stringify(this.#products));
                    this.#products.push(newProduct);
                    mensaje = 'Producto agregado exitosamente!';
                } else
                    mensaje = "Se requiere completar todos los campos";

            }

            return mensaje;
        } catch (error) {
            console.log(error);
        }
    }

    getProduct() {
        return this.#products;
    }

    getProductById(id) {
        const productoId = this.#products.find(p => p.id === id);

        return productoId ? productoId : `El producto con ID ${id} no existe.`;
    }

    updtaeProduct(id, propiedades) {

        try {
            let mensaje;

            const indice = this.#products.findIndex(p => p.id === id);
            if (indice != -1) {
                const { id, ...rest } = propiedades;
                writeFileSync(this.#path, JSON.stringify(this.#products));
                this.#products[indice] = { ...this.#products[indice], ...rest };
                mensaje = 'El producto fue actualizado correctamente!'
            } else
                mensaje = `El producto con ID ${id} no existe`;

            return mensaje;
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct(id) {
        try {
            let mensaje;
            const indice = this.#products.findIndex(p => p.id === id);

            if (indice >= 0) {
                writeFileSync(this.#path, JSON.stringify(this.#products));
                this.#products.splice(indice, 1);
                mensaje = 'Producto eliminado correctamente';
            } else
                mensaje = `El producto con ID ${id} no existe`;

            return mensaje;
        } catch (error) {
            console.log(error);
        }
    }
}

// como estoy usando el import ya no es necesario estas lineas
// module.exports = {
//     ProductManager
// }