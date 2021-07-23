const {model, Schema} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const vehiculoSchema = new Schema({
    
    vehiculo: {
        type: String,
        unique: true
    },
    marca: String,
    ano: Number,
    descripcion: String,
    vendido: Boolean,
    created: Date,
    updated: Date
});

vehiculoSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

vehiculoSchema.plugin(uniqueValidator);

const Vehiculo = model('Vehiculo',vehiculoSchema);

module.exports = Vehiculo;