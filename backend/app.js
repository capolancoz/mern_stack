const express = require('express');
const {config} = require('./config');


// Crear el servidor
const app = express();



// Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');


// Habilitar bodyParser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Habilitar cors
app.use(cors());


// Carpeta Pública
app.use(express.static('uploads'));


app.set('port',config.port);

//Rutas de la app
app.use('/', require('./routes/clienteRoutes'));
app.use('/pedidos', require('./routes/pedidosRoutes'));
app.use('/productos', require('./routes/productosRoutes'));



app.set('port',config.port);




module.exports = app;
