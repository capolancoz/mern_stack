const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController.js');
const productosController = require('../controllers/productosController.js');
const pedidosController = require('../controllers/pedidosController.js');

module.exports = function() {

  // CLIENTES
  // Agrega nuevos clientes via POST
  router.post('/clientes', clienteController.nuevoCliente);

  // Obtener todos los clientes
  router.get('/clientes', clienteController.mostrarClientes);

  // Muestra un cliente
  router.get('/clientes/:idCliente', clienteController.mostrarCliente);

  // Muestra un cliente
  router.put('/clientes/:idCliente', clienteController.actualizarCliente);

  // Elimna un cliente
  router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

  // PRODUCTOS
  // Agrega nuevos productos
  router.post('/productos',
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  // Muestra todos los productos
  router.get('/productos', productosController.mostrarProductos);

  // Muestra un archivo especifico por su id
  router.get('/productos/:idProducto', productosController.mostrarProducto);

  // Actualizar productos
  router.put('/productos/:idProducto',
    productosController.subirArchivo,
    productosController.actualizarProducto
    );


  // Elimna productos
  router.delete('/productos/:idProducto', productosController.eliminarProducto);

  // Busqueda de productos
  router.post('/productos/busqueda/:query', productosController.buscarProducto);

  // PEDIDOS
  // Agrega nuevos pedidos
  router.post('/pedidos/nuevo/:idUsuario', pedidosController.nuevoPedido);

  // Mostrar pedidos
  router.get('/pedidos', pedidosController.mostrarPedidos);

  // Mostrar pedidos por su ID
  router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);

  // Actualizar pedidos
  router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

  // Elimna pedidos
  router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);


  return router
}