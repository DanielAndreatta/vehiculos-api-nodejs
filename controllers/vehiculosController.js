const Vehiculo = require('../models/Vehiculo')


    // let vehiculos = [
    //     {
    //         vehiculo: "Integra GS 1.8",
    //         marca: "Acura",
    //         ano: 1996,
    //         descripcion: "descripción del vehículo",
    //         vendido: false,
    //         created: "2021-07-34124134",
    //         updated: "2021-07-34124134"
    //     },
    //     {
    //         vehiculo: "Legend 3.2/3.5",
    //         marca: "Acura",
    //         ano: 1997,
    //         descripcion: "descripción del vehículo",
    //         vendido: false,
    //         created: "2021-07-34124134",
    //         updated: "2021-07-34124134"
    //     },
    //     {
    //         vehiculo: "NSX 3.0",
    //         marca: "Acura",
    //         ano: 2000,
    //         descripcion: "descripción del vehículo",
    //         vendido: false,
    //         created: "2021-07-34124134",
    //         updated: "2021-07-34124134"
    //     }
    // ]

//  /vehiculos

// muestra todos los vehiculos
exports.mostrarVehiculos = async (request, response, next) => {
    
    const vehiculos = await Vehiculo.find({})

    response.json(vehiculos)
};

// crea un vehiculo
exports.crearVehiculo = async(request,response,next) => {

    const {vehiculo, marca, ano, descripcion, vendido = false} = request.body;

    if(!vehiculo || !marca || !ano || !descripcion){
        return response.status(400).json({
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
        response.status(201).json(savedVehiculo);
    } catch (error) {
        next(error);
    }
    
};


//  /vehiculos/find
exports.buscarVehiculo = async (request, response, next) => {

    const {marca, ano} = request.query

    
    try {

        const savedVehiculo = await Vehiculo.find( marca && ano ? {$and:[{marca},{ano} ]} : {$or:[{marca},{ano} ]})
           
        response.status(200).json(savedVehiculo)

    } catch (error) {
        
        next(error)
    }

}



//  /vehiculos/:id

// muestra un vehiculo por id
exports.mostrarVehiculoId = async (request, response, next) => {
    
    try {
        const {id} = request.params

        const findVehiculo = await Vehiculo.findById(id)
        if (findVehiculo) {
            response.status(200).json(findVehiculo);
        } else {
            response.status(404).end()
        }
        

    } catch (error) {
        next(error);
    }
}

// actualizar un vehiculo
exports.updateVehiculoId = async (request, response, next) => {
   
    try {

        const {id} = request.params
        const {vehiculo, marca, ano, descripcion, vendido = false} = request.body
    
        
        if(!vehiculo || !marca || !ano || !descripcion){
            return response.status(400).json({
                error: 'Falta un campo obligatorio'
            });
        }

        const newVehiculo = {
            vehiculo,
            marca,
            ano,
            descripcion,
            vendido,
            updated: new Date()
        }

        

        const savedVehiculo = await Vehiculo.findByIdAndUpdate(id, newVehiculo, {new: true})
        response.status(200).json(savedVehiculo);

    } catch (error) {
        next(error);
    }
}

// cambiar estado de vendido
exports.cambiarEstadoVendido = async (request, response, next) => {

    try {
        const { id } = request.params;
        const {vendido} = await Vehiculo.findById(id);
    
        // cambiar el estado
        let estado = false;
        if(vendido === estado) {
            estado = true;
        }
    
        const newVehiculo = {
            vendido: estado,
            updated: new Date()
        }


        const savedVehiculo = await Vehiculo.findByIdAndUpdate(id, newVehiculo, {new: true})
        response.status(200).json(savedVehiculo);

    } catch (error) {
        next(error);
    }
    
}

// borrar vehiculo
exports.borrarVehiculoId = async (request, response, next) => {
    

    const {id} = request.params
    
    try {
        await Vehiculo.findByIdAndDelete(id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
    
}



