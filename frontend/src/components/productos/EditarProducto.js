import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2'
import {useNavigate, useParams} from 'react-router-dom';
import Spinner from "../layout/Spinner";

function EditarProducto() {

  let navigate = useNavigate();

  // Obtener el ID
  const { id } = useParams();

  // producto = state, y funcion para actualizar
  const [ producto, guardarProducto ] = useState({
    artista: '',
    album: '',
    fecha: '',
    descripcion: '',
    precio: '',
    imagen: '',
  });

  // archivo = state, guardarArchivo = setState
  const [archivo, guardarArchivo] = useState('');

  // Consultar la API para traer el producto a editar
  const consultarAPI = async ()=> {
    const productoConsulta = await clienteAxios.get(`/productos/${id}`);
    guardarProducto(productoConsulta.data)
  }

  // Cuando el componenete carga
  useEffect(() => {
    consultarAPI();
  }, [])

  // Edita un producto en la base de datos
  const editarProducto = async e => {
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
      const res = await clienteAxios.put(`/productos/${id}`, formData, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      if(res.status === 200) {
        Swal.fire(
          'Producto actualizado',
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

  // Extraer los valores del state
  const { artista, album, fecha, descripcion, precio, imagen } = producto;
  if(!artista) return <Spinner/>

  return (
    <Fragment>
      <h2>Editar producto</h2>
      <form onSubmit={editarProducto}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Artista o Banda:</label>
          <input type="text" placeholder="Nombre del Artista o Banda" name="artista" onChange={leerInformacionProducto} defaultValue={artista}/>
        </div>
        <div className="campo">
          <label>Album:</label>
          <input type="text" placeholder="Album" name="album" onChange={leerInformacionProducto} defaultValue={album}/>
        </div>
        <div className="campo">
          <label>Fecha de lanzamiento:</label>
          <input type="text" placeholder="Fecha" name="fecha" onChange={leerInformacionProducto} defaultValue={fecha}/>
        </div>
        <div className="campo">
          <label>Descripción:</label>
          <input type="text" placeholder="Descripción del album" name="descripcion" onChange={leerInformacionProducto} defaultValue={descripcion}/>
        </div>
        <div className="campo">
          <label>Precio:</label>
          <input type="number" placeholder="Precio" name="precio" min="50" step="1" onChange={leerInformacionProducto} defaultValue={precio}/>
        </div>
        <div className="campo">
          <label>Imagen:</label>
          { imagen ? (
            <img src={`http://localhost:5000/${imagen}`} alt="imagen" width="300"/>
          ) : null}
          <input type="file" name="imagen" onChange={leerArchivo}/>
        </div>
        <div className="enviar">
          <input type="submit" className="btn btn-rojo" value="Actualizar Producto"/>
        </div>
      </form>
    </Fragment>
  )
}

export default EditarProducto;