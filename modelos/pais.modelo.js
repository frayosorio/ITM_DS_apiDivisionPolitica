const bd = require('./bd');

const Pais = function () { };

Pais.listar = async function (respuesta) {
    try {
        const basedatos = bd.obtenerBD();

        //***** codigo MONGO par listar los paises
        const paises = await basedatos.collection('paises')
            .find()
            .project({
                id: 1,
                nombre: 1,
                continente: 1,
                tipoRegion: 1,
                codigoAlfa2: 1,
                codigoAlfa3: 1
            })
            .toArray();
        //***** 
        respuesta(null, paises);
    } catch (error) {
        console.log(error)
        respuesta(error, null);
    }
}

Pais.agregar = async function (pais, respuesta) {
    try {
        const basedatos = bd.obtenerBD();

        //***** codigo MONGO para agregar un Documento Pais
        await basedatos.collection('paises')
            .insertOne({
                id: pais.id,
                nombre: pais.nombre,
                tipoRegion: pais.tipoRegion,
                continente: pais.continente,
                codigoAlfa2: pais.codigoAlfa2,
                codigoAlfa3: pais.codigoAlfa3
            });
        //***** 
        respuesta(null, pais);
    } catch (error) {
        console.log('Error agregando país ', error)
        respuesta(error, null);
    }

}

Pais.modificar = async function (pais, respuesta) {
    try {
        const basedatos = bd.obtenerBD();

        //***** codigo MONGO para modificar un Documento Pais
        await basedatos.collection('paises')
            .updateOne(
                { id: pais.id },
                {
                    $set: {
                        nombre: pais.nombre,
                        tipoRegion: pais.tipoRegion,
                        continente: pais.continente,
                        codigoAlfa2: pais.codigoAlfa2,
                        codigoAlfa3: pais.codigoAlfa3
                    }
                }
            );
        //***** 
        respuesta(null, pais);
    } catch (error) {
        console.log('Error modificando país ', error)
        respuesta(error, null);
    }

}

Pais.eliminar = async function (idPais, respuesta) {
    try {
        const basedatos = bd.obtenerBD();

        //***** codigo MONGO para eliminar un Documento Pais
        await basedatos.collection('paises')
            .deleteOne(
                { id: eval(idPais) });

        respuesta(null, true);

    } catch (error) {
        console.log('Error eliminando país ', error)
        respuesta(error, false);
    }

}

Pais.capital = async function (nombrePais, respuesta) {
    try {
        const basedatos = bd.obtenerBD();

        //***** codigo MONGO para obtener la capital
        const capitalObtenida = await basedatos.collection('paises')
            .aggregate([
                { $match: { nombre: nombrePais } },
                { $unwind: '$regiones' },
                { $unwind: '$regiones.ciudades' },
                { $match: { "regiones.ciudades.capitalPais": true } },
                {
                    $project: {
                        ciudad: '$regiones.ciudades.nombre',
                        estado: '$regiones.nombre'
                    }
                }
            ]).toArray();
        //***** 
        respuesta(null, capitalObtenida[0]);
    } catch (error) {
        console.log(error)
        respuesta(error, null);
    }
}

module.exports = Pais;