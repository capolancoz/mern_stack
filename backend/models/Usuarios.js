const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  nombre : {
    type: String,
    required: 'Agrega tu nombre'
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
},  {
    timestamps:false,
    versionKey:false
});


module.exports = mongoose.model('Usuarios', usuariosSchema)