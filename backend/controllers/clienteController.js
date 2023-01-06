const clienteController = {}
const Clientes = require('../models/Clientes');

// Agregar un nuevo cliente
clienteController.nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);
  
  try {
    // Almacena el error
    await cliente.save();
    res.json({mensaje: 'Se agrego un nuevo cliente'});
  } catch (error) {
    // Si hay un error, console.log y next
    res.send(error);
    next();
  }
}

// Muestra todos los clientes
clienteController.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes)
  } catch (error) {
    console.log(error);
    next();
  }
}

// Muestra un cliente por ID
clienteController.mostrarCliente = async (req, res, next) => {
  const cliente = await Clientes.findById(req.params.idCliente);

  if(!cliente) {
    // Enviar un código de estado 404 y un mensaje de error al usuario
    res.status(404).json({mensaje: 'Ese cliente no existe'});
    return next();
  }
  
  // Mostrar el cliente
  res.json(cliente);
}

// Actualiza un cliente por su ID
clienteController.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate({_id: req.params.idCliente}, req.body, {
      new: true
    });
    res.json(cliente);
  } catch (error) {
    res.send(error);
    next();
  }
}

// Elimina un cliente por su ID
clienteController.eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findOneAndDelete({_id: req.params.idCliente});
    res.json({mensaje: 'El cliente fue eliminado'})
  } catch (error) {
    console.log(error)
    next();
  }
}

module.exports = clienteController;