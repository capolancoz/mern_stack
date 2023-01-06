import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import Producto from './Producto';

function Productos() {

  // productos = state, guardarproductos = funcion para guardar el state
  const [productos, guardarProductos] = useState([]);


  // useEffect para consultar API
  useEffect( () => {

    // Query API
    const consultarAPI = async () => {
      const productosConsulta = await clienteAxios.get('/productos');
      guardarProductos(productosConsulta.data);
    }

    // LLamar a la API
    consultarAPI();
  }, [productos]); 

  // Spiner de carga
  if(!productos.length) return <Spinner/>

  return (
    <Fragment>
      <h2>Productos</h2>
      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>Nuevo Producto
      </Link>
      <ul className="listado-productos">
        {productos.map(producto => (
          <Producto
            key={producto._id}
            producto={producto}
          />
        ))}
      </ul>
    </Fragment>
  )
}

export default Productos;