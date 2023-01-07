const usuariosController = {}

const bcrypt = require('bcryptjs');
const Usuarios = require('../models/Usuarios');

const jwt = require('jsonwebtoken');

usuariosController.create = async (req,res)=>{
    // Leer los datos del usuario y colocarlos en usuarios
  const usuario = new Usuarios(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);
  try {
    await usuario.save();
    res.json({
      success:true,
      message : 'Usuario creado correctamente',
      content: usuario
    });
  } catch (error) {
    res.status(502).json(
      {
        success:false,
        message:'Error registrando al usuario',
        content: error
      }
    )
  }
}

usuariosController.auth = async (req,res,next)=>{
    //buscar el usuario
  const {email, password} = req.body;
  const usuario = await Usuarios.findOne({ email });
  if(!usuario){
    //Si el usuario noexiste
    await res.status(401).json({mensaje: 'Ese usuario no existe'});
    next();
  } else{
    //El usuario existe, verificar si la contraseña es correcta
    if(!bcrypt.compareSync( password, usuario.password )) {
      //si la contraseña es incorrecta
      await res.status(401).json({mensaje: 'Contraseña incorrecta'});
      next();
    } else{
      // contraseña correcta, firmar el token
      const token = jwt.sign({
        email: usuario.email,
        nombre: usuario.nombre,
        _id: usuario._id
      }, 'SECRETKEY', { expiresIn: '1h'});

      //retornar el token
      res.json({ token });
    }
  }
}

module.exports = usuariosController;