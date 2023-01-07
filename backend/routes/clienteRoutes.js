const {Router} = require('express');
const router = Router();

const {nuevoCliente, mostrarClientes ,mostrarCliente, actualizarCliente, eliminarCliente} = require('../controllers/clienteController');

//proteger rutas
const {verifyToken} = require('../middlewares/auth.handler');

router.route('/clientes')
  // Agrega nuevos clientes via POST
  .post(verifyToken, nuevoCliente)
  // Obtener todos los clientes
  .get(verifyToken, mostrarClientes)

router.route('/clientes/:idCliente')
  // Muestra un cliente
  .get(mostrarCliente)
  // Actualiza un cliente
  .put(actualizarCliente)
  // Elimna un cliente
  .delete(eliminarCliente)

module.exports = router;