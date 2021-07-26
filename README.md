## Link Heroku

http://#

## API endpoints

`GET /vehiculos`

Retorna todos los vehículos.

---

`GET /vehiculos/find`

Retorna los vehículos de acuerdo al parámetro.
Acepta los parámetros `marca` y `ano`, ya sea uno u ambos.
Ejmplo: `/vehiculos/find?ano=1996`,`/vehiculos/find?marca=Acura`,`/vehiculos/find?marca=Acura&ano=1996`.

---

`GET /vehiculos/{id}`

Devuelve los detalles del vehículo con la id correspondiente.

---

`POST /vehiculos`

Agrega un vehículo.

---

`PUT /vehiculos/{id}`

Actualiza los datos de un vehículo.

---

`PATCH /vehiculos/{id}`

Cambia el estado de `vendido` del vehículo con la id correspondiente.

---

`DELETE /vehiculos/{id}`

Elimina un vehículo.
