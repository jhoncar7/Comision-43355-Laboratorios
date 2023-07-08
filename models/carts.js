import { Schema, model } from 'mongoose';

const nameCollection = 'Carrito'

const CarritoShema = new Schema({
    products: [{
        _id: false,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Producto',
        },
        quantity: {
            required: [true, 'El cantidad del producto es obligatorio'],
            type: Number
        }
    }],
});

CarritoShema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

// CarritoSchema.set('toJSON', { 
//     transform: function (doc, ret) {
//         delete ret.__v;
//         return ret;
//     }
// });

export default model(nameCollection, CarritoShema);

