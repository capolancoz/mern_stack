import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import Producto from './Producto';
import { CRMContext } from "../../context/CRMContext";
function Productos() {
  let navigate = useNavigate();
  // productos = state, guardarproductos = funcion para guardar el state
  const [productos, guardarProductos] = useState([]);

  //utilizar context
  const [auth, guardarAuth] = useContext(CRMContext);

  // useEffect para consultar API
  useEffect(() => {
    if (auth.token !== '') {
      // Query API
      const consultarAPI = async () => {
        try {
          const productosConsulta = await clienteAxios.get('/productos', {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          });
          guardarProductos(productosConsulta.data);
        } catch (error) {
          if(error.response.status = 500){
            navigate('/iniciar-sesion', {replace:true});
          }
        }
      }

      // LLamar a la API
      consultarAPI();
    } else {
      navigate('/iniciar-sesion', { replace: true });
    }
  }, [productos]);

  //Si el state está como false
  if(!auth.auth){
    navigate('/iniciar-sesion', {replace:true});
  }

  // Spiner de carga
  if (!productos.length) return <Spinner />

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