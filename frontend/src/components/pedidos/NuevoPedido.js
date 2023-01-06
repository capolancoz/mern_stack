import React, { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";
import Swal from "sweetalert2";

function NuevoPedido() {

  let navigate = useNavigate();

  // Obtener el ID del cliente
  const { id } = useParams();

  // state
  const [cliente, guardarCliente] = useState({});
  const [busqueda, guardarBusqueda] = useState("");
  const [productos, guardarProductos] = useState([]);
  const [total, guardarTotal] = useState(0);

  useEffect(() => {
    const consultarAPI = async () => {
      // consultar el cliente actual
      const resultado = await clienteAxios.get(`/clientes/${id}`);
      guardarCliente(resultado.data);
    };
    // Llamar a la API
    consultarAPI();

    // Actualizar el total a pagar
    actualizarTotal()
  }, [productos]);

  const buscarProducto = async (e) => {
    e.preventDefault();

    // Obtener los productos de la búsqueda
    const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

    // Si no hay resultados una alerta, contrario agregarlo al state
    if (resultadoBusqueda.data[0]) {
      let productoResultado = resultadoBusqueda.data[0];
      // Agrega la llave "producto" (copia de id)
      productoResultado.producto = resultadoBusqueda.data[0]._id;
      productoResultado.cantidad = 0;

      // Ponerlo en el state
      guardarProductos([...productos, productoResultado]);

    } else {
      // No hay resultados
      Swal.fire({
        type: 'error',
        title: "Ese producto no existe",
        text: "Comprueba los errores ortográficos",
      });
    }
    console.log(resultadoBusqueda);
  };

  // Almacenar una busqueda en el state
  const leerDatosBusqueda = e => {
    guardarBusqueda(e.target.value);
  };

  // Actualizar la cantidad de productos
  const restarProductos = i => {
    // Copiar el arreglo original de productos
    const todosProductos = [...productos];

    // Validar si esta en 0 no se puede reducir
    if(todosProductos[i].cantidad === 0) return;

    // Decremento
    todosProductos[i].cantidad--;

    // Almacenarlo en el state
    guardarProductos(todosProductos);

  }
  const aumentarProductos = i => {
    // Copiar el arreglo para no modificar el original
    const todosProductos = [...productos]
    // Incremento
    todosProductos[i].cantidad++;
    // Almacenarlo en el state
    guardarProductos(todosProductos);

  };

  // Elimina un producto del state
  const eliminarProductoPedido = id => {
    const todosProductos = productos.filter(producto => producto.producto !== id);

    guardarProductos(todosProductos);
  }

  // Actualizar el total a pagar
  const actualizarTotal = () => {
    // Si el arreglo de productos es igual a 0: el total es 0
    if(productos.length === 0) {
      guardarTotal(0);
      return;
    }

    // Calcular nuevo total
    let nuevoTotal = 0;

    // Recorrer todos los productos, sus cantidades y precios
    productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

    // Almacenar total
    guardarTotal(nuevoTotal);
  }

  // Almacena el pedido en la DB
  const realizarPedido = async e => {
    e.preventDefault();

    /*/ Obtener el ID del cliente
    const { id } = useParams();*/

    // Construir el objeto
    const pedido = {
      "cliente": id,
      "pedido": productos,
      "total": total
    }

    // Almacenarlo en la DB
    const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

    // Leer resutado
    if(resultado.status === 200) {
      // Alerta de todo bien
      Swal.fire({
        type: 'succes',
        title: 'Correcto',
        text: resultado.data.mensaje
      })
    } else {
      // Alerta de error
      Swal.fire({
        type: 'error',
        title: 'Hubo un error',
        text: 'Vuelva a intentarlo'
      })
    }

    // Redireccionar
    navigate('/pedidos', {replace:true});

  }

  return (
    <Fragment>
      <h2>Nuevo Pedido</h2>
      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
          Nombre: {cliente.nombre} {cliente.apellido}
        </p>
        <p>Teléfono: {cliente.telefono}</p>
        <p>Dirección: {cliente.direccion}</p>
      </div>
      <FormBuscarProducto
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}
      />

      <ul className="resumen">
        {productos.map((producto, index) => (
          <FormCantidadProducto
            key={producto.producto}
            producto={producto}
            restarProductos={restarProductos}
            aumentarProductos={aumentarProductos}
            eliminarProductoPedido={eliminarProductoPedido}
            index={index}
          />
        ))}
      </ul>
      <p className="total">Total a pagar: <span>S/.{total}</span></p>
      { total > 0 ? (
          <form onSubmit={realizarPedido}>
            <input type="submit" className="btn btn-verde btn-block" value="Realizar pedido"/>
          </form>
      ) : null}
    </Fragment>
  );
}

export default NuevoPedido;
