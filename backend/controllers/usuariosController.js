const userController = {}


const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

userController.registrarUsuario = async (req, res) => {
  
  try {
    const nuevoUsuario = new userModel(req.body)
        await nuevoUsuario.save();
        res.json({
            success:true,
            message:'Usuario añadido con éxito',
            content: nuevoUsuario
        })
  } catch (error) {
    res.status(502).json({
      success:false,
      message:'Error by registering a new user',
      content:error
  })
  }
}


module.exports = userController;