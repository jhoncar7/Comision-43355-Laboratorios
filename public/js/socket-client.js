
const socket = io();

socket.on('connect', () => {
    console.log('cliente conectado desde el front');
});

socket.on('disconnect', () => {
    console.log('Se desconecto el backend');
});

socket.on('productos', datos => {
    console.log({ datos });
    const tbody = document.querySelector('.product-table tbody');
    const productos = datos; // Guardar los datos en una variable

    // Limpiar el contenido existente en el tbody
    tbody.innerHTML = '';

    // Recorrer los productos y agregarlos al tbody
    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${producto.img}"></td>
            <td>${producto.title}</td>
            <td>${producto.description}</td>
            <td>${producto.price}</td>
            <td>${producto.stock}</td>
            <td>
                <button class="borrarProducto" data-id="${producto.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tbody.appendChild(fila);


        const botonBorrar = fila.querySelector('.borrarProducto');
        botonBorrar.addEventListener('click', () => {
            const productoId = botonBorrar.dataset.id;
            console.log({ productoId });
            socket.emit('productos', productoId);
        });

    });
});


