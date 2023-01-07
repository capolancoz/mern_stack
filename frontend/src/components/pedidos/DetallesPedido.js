import React from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';

function DetallesPedido({ pedido }) {

  let navigate = useNavigate();

  const { cliente, _id, total } = pedido;
  console.log(pedido)
  const arrayPedidos = pedido.pedido;
  arrayPedidos.map(articulos => (
    console.log(articulos.producto._id)))


  /*const elementosPedido = pedido.map((elemento) => {
    const { producto } = elemento;
    return producto;
  });
  console.log(elementosPedido)

  for (const elemento in pedido) {
    console.log(elemento); // Imprime el nombre de cada propiedad del objeto
    console.log(pedido[elemento]); // Imprime el valor de cada propiedad del objeto
  }*/


  // Eliminar cliente
  const eliminarPedido = idPedido => {
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
        clienteAxios.delete(`/pedidos/${idPedido}`)
          .then(res => {
            Swal.fire(
              'Pedido eliminado',
              res.data.mensaje,
              'success'
            );
          }

          );
      };
      // Redireccionar
      navigate('/', { replace: true });
    });
  };

  return (
    <li className="pedido">
      <div className="info-pedido">
        <p className="id">ID: {pedido._id}</p>
        <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>
        <h3>Dirección de envio: {cliente.direccion}</h3>
        <h4>Número de contacto: {cliente.telefono}</h4>

        <div className="articulos-pedido">
          <ul>
            {Array.isArray(arrayPedidos) && arrayPedidos.map(articulos => (
              <li key={articulos.producto._id}>
                <p className="productos">Artículos Pedido: </p>
                <p>Artista o banda: {articulos.producto.artista}</p>
                <p>Album: {articulos.producto.album}</p>
                <p>Precio del producto unitario: {articulos.producto.precio}</p>
                <p>Cantidad: {articulos.cantidad}</p>
              </li>
            ))} 
          </ul>
        </div>
        <p className="total">Total: S/.{total} </p>
      </div>
      <div className="acciones">
        <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarPedido(_id)}>
          <i className="fas fa-times"></i>
          Eliminar Pedido
        </button>
      </div>
    </li>
  )
}

export default DetallesPedido;