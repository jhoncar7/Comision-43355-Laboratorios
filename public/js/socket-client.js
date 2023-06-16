

const socket = io();

socket.on('connect', () => {
    console.log('cliente conectado desde el front');
});