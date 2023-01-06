const express = require('express');
const {config} = require('./config');
const routes = require('./routes');


// Crear el servidor
const app = express();


// Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');


// Habilitar bodyParser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Habilitar cors
app.use(cors());

//Rutas de la app
app.use('/', routes());

// Carpeta Pública
app.use(express.static('uploads'));


app.set('port',config.port);


app.get('/',(req,res)=>{
    res.json({
        "success": true,
        "message": "api rest de ecommerce"
    })
})


app.set('port',config.port);



module.exports = app;
