const express = require('express');
const {config} = require('./config');
const session = require('express-session')

// Crear el servidor
const app = express();

app.use(session({
    secret: 'somethingsecretgoeshere',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
 }));


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
app.use('/users', require('./routes/usuariosRoutes'));




app.set('port',config.port);




module.exports = app;
