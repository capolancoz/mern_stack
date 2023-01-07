import React, { Fragment, useContext, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2'
import {useNavigate, useParams} from 'react-router-dom';
import { CRMContext } from "../../context/CRMContext";

function EditarCliente() {

  let navigate = useNavigate();
  const [auth, guardarAuth] = useContext(CRMContext);
  // Obtener el ID
  const { id } = useParams();

  // cliente = state, guardarCliente = funcion para guardar el state
  const [cliente, datosCliente] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    email: "",
    telefono: "",
  });

  // Query a la API
  const consultarAPI = async () => {
    const clienteConsulta = await clienteAxios.get(`/clientes/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    
    // Colocar en el state
    datosCliente(clienteConsulta.data);
  }

  // useEffect, cuando el componente carga
  useEffect(() => {
    consultarAPI();
  }, []);

  // Leer los datos del formulario
  const actualizarState = e => {
    // Almacenar lo que el usuario escribe
    datosCliente({
      // Obtener una copia del state actual
      ...cliente,
      [e.target.name] : e.target.value
    })
    console.log(cliente);
  };

  // Enviar una petición por axios para actualizar el cliente
  const actualizarCliente = e => {
    e.preventDefault();

    // Enviar petición por axios
    clienteAxios.put(`/clientes/${cliente._id}`, cliente, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
      .then(res => {
        // Validar errores en MongoDB
        if(res.data.code === 11000) {
          Swal.fire({
            type: 'error',
            title: 'Hubo un error',
            text: 'Ese correo ya esta en uso'
          })
        } else {
          Swal.fire(
            'Cambios guardados',
            'Cliente modificado con éxito',
            'succes',
          )
        }
        // Redireccionar
        navigate('/', {replace:true});
      })
  }

  // Validar el formulario
  const validarCliente = () => {
    // Destructuring
    const { nombre, apellido, email, direccion, telefono} = cliente
    // Revisar las propiedades del state tengan contenido
    let valido = !nombre.length || !apellido.length || !email.length || !direccion.length || !telefono.length; 
    // Return true or false
    return valido;
  }

  //verificar si el usuario esta autenticado
  if(!auth.auth && (localStorage.getItem('token') === auth.token)){
    return null
  };

  return (
    <Fragment>
      <h2>Editar Cliente</h2>
      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} value={cliente.nombre} />
        </div>
        <div className="campo">
          <label>Apellido:</label>
          <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} value={cliente.apellido} />
        </div>
        <div className="campo">
          <label>Dirección:</label>
          <input type="text" placeholder="Dirección" name="direccion" onChange={actualizarState} value={cliente.direccion} />
        </div>
        <div className="campo">
          <label>Email:</label>
          <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} value={cliente.email} />
        </div>
        <div className="campo">
          <label>Teléfono:</label>
          <input type="tel" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} value={cliente.telefono} />
        </div>
        <div className="enviar">
          <input type="submit" className="btn btn-rojo" value="Guardar Cambios"  disabled={validarCliente()}/>
        </div>
      </form>
    </Fragment>
  );
}

export default EditarCliente;

