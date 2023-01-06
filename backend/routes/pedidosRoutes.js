const {Router} = require('express');
const router = Router();

const {nuevoPedido, mostrarPedidos ,mostrarPedido, actualizarPedido, eliminarPedido} = require('../controllers/pedidosController');

router.route('/')
  // Mostrar pedidos
  .get(mostrarPedidos)

router.route('/:idPedido')
  // Mostrar pedidos por su ID
  .get(mostrarPedido)
  // Actualizar pedidos
  .put(actualizarPedido)
  // Elimna pedidos
  .delete(eliminarPedido)

router.route('/nuevo/:idUsuario')
  // Mostrar pedidos
  .post(nuevoPedido)

module.exports = router;