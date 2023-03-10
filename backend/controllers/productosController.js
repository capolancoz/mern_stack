const productosController = {}

const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

// Pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
productosController.subirArchivo = async (req, res, next) => {
  await upload(req, res, function(error) {
    if(error) {
      res.json({mensaje: error})
    }
    return next();
  }) 
}




// Agrega nuevo producto
productosController.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);

  try {
    if(req.file.filename) {
      producto.imagen = req.file.filename
    }
    await producto.save();
    res.json({mensaje: 'Producto agregado con éxito'})
  } catch (error) {
    console.log(error);
    next();
  }
}


// Muestra todos los productos
productosController.mostrarProductos = async (req, res, next) => {
  try {
    // Obtener todos los productos
    const productos = await Productos.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
    next();
  }
}

// Muestra un producto en espeficico
productosController.mostrarProducto = async (req, res, next) => {
  const producto = await Productos.findById(req.params.idProducto);

  if(!producto) {
    // Enviar un código de estado 404 y un mensaje de error al usuario
    res.status(404).json({mensaje: 'Ese producto no existe'});
    return next();
  }


  // Mostrar el producto
  res.json(producto);

}

// Actualiza un producto via ID
productosController.actualizarProducto = async (req, res, next) => {
  try {

    // Construir nuevo producto
    let nuevoProducto = req.body

    //Verificar si hay imagen nueva
    if(req.file) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      let productoAnterior = await Productos.findById(req.params.idProducto);
      nuevoProducto.imagen = productoAnterior.imagen;
    }


    let producto = await Productos.findOneAndUpdate({_id: req.params.idProducto},
      req.body, {
        new: true
      });
      res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
}

// Eliminar un producto via ID
productosController.eliminarProducto = async (req, res, next) => {
  try {
    await Productos.findByIdAndDelete({_id: req.params.idProducto});
    res.json({mensaje: 'El producto se ha eliminado'})
  } catch (error) {
    console.log(error);
    next();
  }
}

productosController.buscarProducto = async (req, res, next) => {
  try {
    // Obtener el query
    const { query } = req.params;
    const producto = await Productos.find({
  $or: [
    { artista: new RegExp(query, 'i') },
    { album: new RegExp(query, 'i') }
      ]
  });
    res.json(producto);

  } catch (error) {
    console.log(error);
    next();
  }
}

module.exports = productosController;