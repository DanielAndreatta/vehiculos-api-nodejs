const express = require('express');
const router = express.Router();


// const {body} = require('express-validator');

const vehiculosController = require('../controllers/vehiculosController');


module.exports = function(){

    router.get('/', (request, response) => {
        response.send('<h1>Hello Word</h1>')
    })

    
    router.get('/vehiculos',vehiculosController.mostrarVehiculos);
    router.post('/vehiculos',vehiculosController.crearVehiculo);



    router.get('/vehiculos/:id', vehiculosController.mostrarVehiculoId)

    router.put('/vehiculos/:id', vehiculosController.updateVehiculoId)

    router.patch('/vehiculos/:id', vehiculosController.cambiarEstadoVendido)

    router.delete('/vehiculos/:id', vehiculosController.borrarVehiculoId)



    router.get('/vehiculos/find', vehiculosController.buscarVehiculo)

    return router;
}