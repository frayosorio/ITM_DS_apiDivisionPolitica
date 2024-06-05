const express=require('express');
const app=express();


//conectarse a la base de datos
const bd = require('./modelos/bd');
bd.conectar();

//permite recibir y exportar información en formato JSON
app.use(express.json());

//Incluir las rutas disponibles para los metodos de la API
require('./rutas/pais.rutas')(app);

const puerto=3030;

console.log('Bienvenido a la API de División Política');

app.listen(puerto, () => {
    console.log(`API iniciada y escuchando por el puerto ${puerto}`)
});


