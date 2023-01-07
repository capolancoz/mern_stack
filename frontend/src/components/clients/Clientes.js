import React, { useEffect, useState, Fragment, useContext } from "react";
import clienteAxios from '../../config/axios';
import Cliente from '../clients/Cliente';
import Spinner from '../layout/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { CRMContext } from "../../context/CRMContext";

function Clientes() {
  let navigate = useNavigate();
  // Trabajar con el state
  // Clientes = state, guardarClientes guarda el state =
  const [clientes, guardarClientes] = useState([]);

  //utilizar context
  const [auth, guardarAuth] = useContext(CRMContext);

  console.log(auth)

  useEffect(() => {

    if (auth.token !== '') {
      // Query a la API
      const consultarAPI = async () => {
        try {
          const clientesConsulta = await clienteAxios.get('/clientes', {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          });
          // Coloar resultado en el state
          guardarClientes(clientesConsulta.data);
        } catch (error) {
          if(error.response.status = 500){
            navigate('/iniciar-sesion', {replace:true});
          }
        }
      };
      consultarAPI();
    } else{
      navigate('/iniciar-sesion', {replace:true});
    }


  }, [clientes]);

  //Si el state está como false
  if(!auth.auth){
    navigate('/iniciar-sesion', {replace:true});
  }

  // Spiner de carga
  if (!clientes.length) return <Spinner />

  return (
    <Fragment>
      <h2>Clientes</h2>
      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>Nuevo Cliente</Link>
      <ul className="listado-clientes">
        {clientes.map(cliente => (
          <Cliente
            key={cliente._id}
            cliente={cliente}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default Clientes;