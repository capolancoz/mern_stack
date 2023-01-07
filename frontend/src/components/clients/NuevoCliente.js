import React, { Fragment, useContext, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { CRMContext } from "../../context/CRMContext";

function NuevoCliente() {

  let navigate = useNavigate();
  //utilizar context
  const [auth, guardarAuth] = useContext(CRMContext);

  // cliente = state, guardarCliente = funcion para guardar el state
  const [cliente, guardarCliente] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    email: "",
    telefono: "",
  });

  // Leer los datos del formulario
  const actualizarState = e => {
    // Almacenar lo que el usuario escribe
    guardarCliente({
      // Obtener una copia del state actual
      ...cliente,
      [e.target.name]: e.target.value
    })
  };

  // Añadir un cliente en la API
  const agregarCliente = e => {
    e.preventDefault();

    // Enviar petición
    clienteAxios.post('/clientes', cliente, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
      .then(res => {
        // Validar errores en MongoDB
        if (res.data.code === 11000) {
          Swal.fire({
            type: 'error',
            title: 'Hubo un error',
            text: 'Ese correo ya esta en uso'
          })
        } else {
          Swal.fire(
            'Se agregó el cliente con éxito',
            res.data.mensaje,
          )
        }
        // Redireccionar
        navigate('/', { replace: true });
      });
  };

  // Validar el formulario
  const validarCliente = () => {
    // Destructuring
    const { nombre, apellido, email, direccion, telefono } = cliente
    // Revisar las propiedades del state tengan contenido
    let valido = !nombre.length || !apellido.length || !email.length || !direccion.length || !telefono.length;
    // Return true or false
    return valido;
  }

  //verificar si el usuario esta autenticado
  if(!auth.auth && (localStorage.getItem('token') === auth.token)){
    return null;
  };
  return (
    <Fragment>
      <h2>Nuevo cliente</h2>
      <form onSubmit={agregarCliente}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} />
        </div>
        <div className="campo">
          <label>Apellido:</label>
          <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} />
        </div>
        <div className="campo">
          <label>Dirección:</label>
          <input type="text" placeholder="Dirección" name="direccion" onChange={actualizarState} />
        </div>
        <div className="campo">
          <label>Email:</label>
          <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} />
        </div>
        <div className="campo">
          <label>Teléfono:</label>
          <input type="tel" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} />
        </div>
        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Agregar Cliente" disabled={validarCliente()} />
        </div>
      </form>
    </Fragment>
  );
}

export default NuevoCliente;
