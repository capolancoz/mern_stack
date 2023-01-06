import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from '../../config/axios';
import Cliente from '../clients/Cliente';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

function Clientes() {

  // Trabajar con el state
  // Clientes = state, guardarClientes guarda el state =
  const [clientes, guardarClientes] = useState ([]);


  useEffect( () => {
  // Query a la API
  const consultarAPI = async () => {
    const clientesConsulta = await clienteAxios.get('/clientes');
    // Coloar resultado en el state
    guardarClientes(clientesConsulta.data);
  };
    consultarAPI();
  },[clientes]);

  // Spiner de carga
  if(!clientes.length) return <Spinner/>

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