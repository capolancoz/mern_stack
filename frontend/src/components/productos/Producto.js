import React from "react";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Producto({producto}) {

  // Extraer valores
  const {_id, artista, album, fecha, descripcion, precio, imagen} = producto;

  // Eliminar producto
  const eliminarProducto = idProducto => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Esta acción no se puede revertir",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {

        // Llamndo Axios
        clienteAxios.delete(`/productos/${idProducto}`)
          .then(res => {
            if(res.status === 200) {
              Swal.fire(
                'Producto eliminado',
                res.data.mensaje,
                'success'
              )
            }
          });
      };
    });
  };


  return (
    <li className="producto">
          <div className="info-producto">
            <p className="nombre">{artista}</p>
            <h3>{album}</h3>
            <p className="precio">{descripcion}. El lanzamiento de este album fue en <b>{fecha}</b></p>
            <p className="precio">S/.{precio}</p>
            { imagen ? (
              <img src={`http://localhost:5000/${imagen}`} alt="imagen"/>
              ) : null
            }
            
          </div>
          <div className="acciones">
          <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>Editar Producto</Link>
            <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarProducto(_id)}>
            <i className="fas fa-times"></i>Eliminar Producto</button>
          </div>
    </li>
  )
}

export default Producto;