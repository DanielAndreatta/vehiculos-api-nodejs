const moongose = require('mongoose')
const {server} = require('../index')
const Vehiculo = require('../models/Vehiculo')

const {api, initialVehiculos, getAllFromVehiculos, getVehiculos} = require('./helpers')


beforeEach( async () => {

    await Vehiculo.deleteMany({})

    // secuencial, guarda ordenadamente
    for (const vehiculo of initialVehiculos){
        const vehiculosObject = new Vehiculo(vehiculo)
        await vehiculosObject.save()
    }
})



describe('test a GET(/vehiculos)', () => {

    test('los vehiculos se devuelven en json', async () => {
        await api
            .get('/vehiculos')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('queremos ver tres vehiculos', async () => {
        const response = await api.get('/vehiculos')
        expect(response.body).toHaveLength(initialVehiculos.length)
    })

    test('algun vehiculo contiene la marca "Fiat"', async () => {
        const {marca} = await getAllFromVehiculos()
    
        expect(marca).toContain('Fiat')
    })

    test('algun vehiculo contiene el nombre  "Punto BLACKMOTION 1.8 Flex 16V 5p."', async () => {
        const {vehiculo} = await getAllFromVehiculos()
    
        expect(vehiculo).toContain('Punto BLACKMOTION 1.8 Flex 16V 5p.')
    })

    test('algun vehiculo contiene la descripcion  "descripción del vehículo"', async () => {
        const {descripcion} = await getAllFromVehiculos()
    
        expect(descripcion).toContain('descripción del vehículo')
    })

    test('algun vehiculo contiene el año "2000"', async () => {
        const {ano} = await getAllFromVehiculos()
    
        expect(ano).toContain(2000)
    })

    test('algun vehiculo contiene vendido = "true"', async () => {
        const {vendido} = await getAllFromVehiculos()
    
        expect(vendido).toContain(true)
    })
    
})

describe('test a POST(/vehiculos)', () => {

    test('añadir un nuevo vehiculo valido', async () => {
        const newVehiculo = {
                vehiculo: "Twingo Pack 1.0 16V 70cv",
                marca: "Renault",
                ano: 1998,
                descripcion: "descripción del vehículo",
                vendido: false,
                created: new Date() ,
                updated: new Date()   
        }
        
    
        await api
            .post('/vehiculos')
            .send(newVehiculo)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const {vehiculo, response} = await getAllFromVehiculos()
    
        expect(response.body).toHaveLength(initialVehiculos.length+1)
    
        expect(vehiculo).toContain(newVehiculo.vehiculo)
    })

    test('no se puede añadir un vehiculo sin modelo', async () => {
        const newVehiculo = {
            marca: "Renault",
            ano: 1998,
            descripcion: "descripción del vehículo",
            vendido: false,
            created: new Date() ,
            updated: new Date()  
        }
    
        await api
            .post('/vehiculos')
            .send(newVehiculo)
            .expect(400)
    
        const response = await api.get('/vehiculos')
    
        expect(response.body).toHaveLength(initialVehiculos.length)
    })
})


describe('test a DELETE(/vehiculos/:id)', () => {

    test('debe borrarse un vehiculo', async () => {
        const {response: firstResponse} = await getAllFromVehiculos()
        const {body:vehiculos} = firstResponse
        const vehiculoToDelete = vehiculos[0]
    
        await api
            .delete(`/vehiculos/${vehiculoToDelete.id}`)
            .expect(204)
        
        
        const {vehiculo, response: secondResponse} = await getAllFromVehiculos()
        
        expect(secondResponse.body).toHaveLength(initialVehiculos.length-1)
    
        expect(vehiculo).not.toContain(vehiculoToDelete.vehiculo)
    })
    
    
    test('el vehiculo no debe borrarse porque la id no existe', async () => {
        await api
            .delete(`/vehiculos/123135`)
            .expect(400)
        
        
        const {response} = await getAllFromVehiculos()
        
        expect(response.body).toHaveLength(initialVehiculos.length)
    })
})

// describe('test a GET(/vehiculos/find)', () => {

//     test('el vehiculo numero 3 contiene modelo = "Punto BLACKMOTION 1.8 Flex 16V 5p."', async () => {
        
//         const {id, vehiculo:vehiculoComparar} = await getAllFromVehiculos()

//         await api
//             .get(`/vehiculos/${id}`)
//             .expect(200)
//             .expect('Content-Type', /application\/json/)
    
//         expect(vehiculo).toContain(vehiculoComparar)
//     })

// })


afterAll( () => {
    moongose.connection.close();
    server.close();
})