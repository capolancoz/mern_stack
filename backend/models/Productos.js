const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosSchema = new Schema({
  artista: {
    type: String,
    trim: true
  },
  album: {
    type: String,
    trim: true
  },
  fecha: {
    type: String,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  precio: {
    type: Number,
  },
  imagen: {
    type: String,
  },
})

module.exports = mongoose.model('Productos', productosSchema)