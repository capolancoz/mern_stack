const {config} = require('../config');
const mongoose = require('mongoose');

// Conectar mongo
mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri);

console.log('Conectado a Mongodb');

