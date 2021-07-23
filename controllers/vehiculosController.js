const Vehiculo = require('../models/Vehiculo')


    // let vehiculos = [
    //     {
    //         vehiculo: "Integra GS 1.8",
    //         marca: "Acura",
    //         ano: 1996,
    //         descripcion: "vehiculo grande",
    //         vendido: false,
    //         created: "2021-07-34124134",
    //         updated: "2021-07-34124134"
    //     },
    //     {
    //         vehiculo: "Legend 3.2/3.5",
    //         marca: "Acura",
    //         ano: 1997,
    //         descripcion: "vehiculo grande",
    //         vendido: false,
    //         created: "2021-07-34124134",
    //         updated: "2021-07-34124134"
    //     },
    //     {
    //         vehiculo: "NSX 3.0",
    //         marca: "Acura",
    //         ano: 2000,
    //         descripcion: "vehiculo grande",
    //         vendido: false,
    //         created: "2021-07-34124134",
    //         updated: "2021-07-34124134"
    //     }
    // ]

//  /vehiculos

exports.mostrarVehiculos = async (request, response) => {
    
    const vehiculos = await Vehiculo.find({})

    response.json(vehiculos)
};


exports.crearVehiculo = async(req,res,next) => {

    const {vehiculo, marca, ano, descripcion, vendido = false} = req.body;

    if(!vehiculo || !marca || !ano || !descripcion){
        return res.status(400).json({
            error: 'Falta un campo obligatorio'
        });
    }

    const newVehiculo = new Vehiculo({

        vehiculo,
        marca,
        ano,
        descripcion,
        vendido,
        created: new Date(),
        updated: null
        
    });

    try {
        
        const savedVehiculo = await newVehiculo.save();
        res.status(201).json(savedVehiculo);
    } catch (error) {
        next(error);
    }
    
};



//  /vehiculos/:id

exports.mostrarVehiculoId = async (request, response) => {
    const {id} = request.params
    
    Vehiculo.findById(id).then( vehiculo => {
        if (vehiculo) {
            response.json(vehiculo)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
}

exports.updateVehiculoId = async (request, response) => {

}

// exports.cambiarEstadoVendido = async (request, response) => {

// }

// exports.borrarVehiculoId = async (request, response) => {

// }


// //  /vehiculos/find

// exports.buscarPorMarca = async (request, response) => {

// }
