import React, { Fragment, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom';

function NuevoProducto() {

  let navigate = useNavigate();

  // Producto = state, guardarProducto = setstate
  const [producto, guardarProducto] = useState ({
    artista: '',
    album: '',
    fecha: '',
    descripcion: '',
    precio: ''
  })
  // archivo = state, guardarArchivo = setState
  const [archivo, guardarArchivo] = useState('');

  // Almacena el nuevo producto
  const agregarProducto = async e => {
    e.preventDefault();

    // Crear un formdata
    const formData = new FormData();
    formData.append('artista', producto.artista);
    formData.append('album', producto.album);
    formData.append('fecha', producto.fecha);
    formData.append('descripcion', producto.descripcion);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    // Almacenar en la DB
    try {
      const res = await clienteAxios.post('/productos', formData, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      if(res.status === 200) {
        Swal.fire(
          'Producto agregado',
          res.data.mensaje,
          'success'
        )
      }

      // Redireccionar 
      navigate('/productos', {replace:true});

    } catch (error) {
      console.log(error)
      // Lanzar alerta
      Swal.fire({
        type: 'error',
        title: 'Hubo un error',
        text: 'Vuelve a intentarlo'
      })
    }
  }

  // Leer datos del formulario
  const leerInformacionProducto = e => {
    guardarProducto({
      // Obtener copia del state y agregar el nuevo
      ...producto,
      [e.target.name] : e.target.value
    })
    console.log(producto)
  }

  // Coloca la imagen en el state
  const leerArchivo = e => {
    guardarArchivo(e.target.files[0])
  }

  return (
    <Fragment>
      <h2>Nuevo producto</h2>
      <form onSubmit={agregarProducto}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Artista o Banda:</label>
          <input type="text" placeholder="Nombre del Artista o Banda" name="artista" onChange={leerInformacionProducto}/>
        </div>
        <div className="campo">
          <label>Album:</label>
          <input type="text" placeholder="Album" name="album" onChange={leerInformacionProducto}/>
        </div>
        <div className="campo">
          <label>Fecha de lanzamiento:</label>
          <input type="text" placeholder="Fecha" name="fecha" onChange={leerInformacionProducto}/>
        </div>
        <div className="campo">
          <label>Descripción:</label>
          <input type="text" placeholder="Descripción del album" name="descripcion" onChange={leerInformacionProducto}/>
        </div>
        <div className="campo">
          <label>Precio:</label>
          <input type="number" placeholder="Precio" name="precio" min="50" step="1" onChange={leerInformacionProducto}/>
        </div>
        <div className="campo">
          <label>Imagen:</label>
          <input type="file" placeholder="Portada del disco" name="imagen" onChange={leerArchivo}/>
        </div>
        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
        </div>
      </form>
    </Fragment>
  );
}

export default NuevoProducto;