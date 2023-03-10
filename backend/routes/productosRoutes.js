const {Router} = require('express');
const router = Router();

const {subirArchivo, nuevoProducto ,mostrarProductos, mostrarProducto, actualizarProducto, eliminarProducto, buscarProducto} = require('../controllers/productosController');

const {verifyToken} = require('../middlewares/auth.handler');

router.route('/')
  // Mostrar pedidos
  .post(subirArchivo)
  .post(nuevoProducto)
  .get(verifyToken, mostrarProductos)

router.route('/:idProducto')
  // Mostrar pedidos por su ID
  .get(mostrarProducto)
  // Subir archivos
  .put(subirArchivo)
  // Actualiza productos
  .put(actualizarProducto)
  // Elimna productos
  .delete(eliminarProducto)

router.route('/busqueda/:query')
  // Buscar Productos
  .post(buscarProducto)

module.exports = router;
