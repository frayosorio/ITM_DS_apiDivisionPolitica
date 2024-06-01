module.exports = (app) => {

    const controlador = require('../controladores/pais.controlador');

    app.get('/paises', controlador.listar);
    app.post('/paises/agregar', controlador.agregar);
    app.put('/paises/modificar', controlador.modificar);
    app.delete('/paises/eliminar/:id', controlador.eliminar);
    app.get('/paises/capital/:pais', controlador.capital);


}