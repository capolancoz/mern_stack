import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';


// Componentes
import Clientes from './components/clients/Clientes';
import NuevoClientes from './components/clients/NuevoCliente';
import EditarClientes from './components/clients/EditarCliente';

import Productos from './components/productos/Productos';
import EditarProducto from './components/productos/EditarProducto';
import NuevoProducto from './components/productos/NuevoProducto';

import Pedidos from './components/pedidos/Pedidos';
import NuevoPedido from './components/pedidos/NuevoPedido';


function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            <Routes>
              <Route exact path="/" element={<Clientes/>}/>
              <Route exact path="/clientes/nuevo" element={<NuevoClientes/>}/>
              <Route exact path="/clientes/editar/:id" element={<EditarClientes/>}/>
              <Route exact path="/productos" element={<Productos/>}/>
              <Route exact path="/productos/nuevo" element={<NuevoProducto/>}/>
              <Route exact path="/productos/editar/:id" element={<EditarProducto/>}/>
              <Route exact path="/pedidos" element={<Pedidos/>}/>
              <Route exact path="/pedidos/nuevo/:id" element={<NuevoPedido/>}/>
            </Routes>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
