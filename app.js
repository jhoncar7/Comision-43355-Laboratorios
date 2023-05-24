// const { ProductManager } = require('./productos.js')
// uso el import -> en el package.json agrego esta linea -> "type": "module",
import ProductManager from "./productos.js";

const productos = new ProductManager('./data/productos.json');

const p1 = productos.addProduct("Monitor", "DELL 50'", 5000, "img1", "abc123", 5);
const p2 = productos.addProduct("Mouse", "Inalambrico", 4000, "img1", "abc124", 10);
const p3 = productos.addProduct("Lapto", "DELL", 1000, "img1", "abc1245", 34);
const p4 = productos.addProduct("Teclado", "Gamer", 1000, "img1", "abc124");
const p5 = productos.addProduct("Monitor", "Samsung 27'", 1000, "img1", "abc12457", 34);
const p6 = productos.addProduct("Memoria Ram", "16gb", 6000, "img1", "abc12457s", 34);
const p7 = productos.addProduct("Teclado", "Gamer", 1000, "img1", "abc124as");
console.log({ p1, p2, p3, p4, p5, p6, p7 });
console.log(productos.getProductById(5));

console.log(productos.deleteProduct(3));
console.log(productos.deleteProduct(13));

const updateP1 = {
    id: 50,
    price: 5000,
    stock: 500,
    img: './documents/imagenes/monitor.jpg',
    title: 'Monitor HD'
}

console.log(productos.updtaeProduct(4, updateP1));
console.log(productos.getProduct());