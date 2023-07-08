import { Schema, model } from 'mongoose';

const UsuarioShema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    correo: { type: String, required: [true, 'El correo es obligatorio'], unique: true },
    password: { type: String, required: [true, 'El contraseña es obligatorio'] },
    img: { type: String },
    rol: { type: String, required: [true, 'El contraseña es obligatorio'], enum: ['ADMIN_ROLE', 'USER_ROLE'] },
    estado: { type: Boolean, default: true },
    google: { type: Boolean, default: false },
});

export default model('Usuario', UsuarioShema);
