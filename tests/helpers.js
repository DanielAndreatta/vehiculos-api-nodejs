const {app} = require('../index')
const supertest = require('supertest')
const Vehiculo = require('../models/Vehiculo')

const api = supertest(app)


const initialVehiculos = [
    {
    vehiculo: "Integra GS 1.8",
    marca: "Acura",
    ano: 1996,
    descripcion: "descripción del vehículo",
    vendido: false,
    created: "2021-07-26T00:49:53.603Z",
    updated: "2021-07-26T18:16:46.760Z"
    },
    {
    vehiculo: "NSX3.0",
    marca: "Acura",
    ano: 2000,
    descripcion: "descripción del vehículo",
    vendido: true,
    created: "2021-07-26T00:49:57.412Z",
    updated: "2021-07-26T18:19:00.114Z"
    },
    {
    vehiculo: "Punto BLACKMOTION 1.8 Flex 16V 5p.",
    marca: "Fiat",
    ano: 1996,
    descripcion: "descripción del vehículo",
    vendido: false,
    created: "2021-07-26T18:26:49.290Z",
    updated: null
    }
]

const getVehiculos = async () => {
    const vehiculosDB = await Vehiculo.find({})
    return vehiculosDB.map( vehiculo => vehiculo.toJSON())
}

const getAllFromVehiculos = async () => {

    const response = await api.get('/vehiculos')
    return {
        marca: response.body.map( marca => marca.marca),
        vehiculo: response.body.map( vehiculo => vehiculo.vehiculo),
        ano: response.body.map( ano => ano.ano),
        descripcion: response.body.map( descripcion => descripcion.descripcion),
        vendido: response.body.map( vendido => vendido.vendido),
        response
    }
}


module.exports = {api, initialVehiculos, getAllFromVehiculos, getVehiculos}