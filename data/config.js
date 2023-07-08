import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_DB_MONGO);
        console.log('Base de datos Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al levantar la base de datos')
    }
};