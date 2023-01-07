import React, { useContext } from "react";
import { CRMContext } from "../../context/CRMContext";
import {useNavigate} from 'react-router-dom';
import logo from '../../logo.png'
const Header = () => {
  let navigate = useNavigate();
  const [auth, guardarAuth] = useContext(CRMContext);

  const cerrarSesion = () => {
    guardarAuth({
      token: '',
      auth: false
    });

    localStorage.setItem('token', '')
    navigate('/iniciar-sesion', {replace:true});
  }
  return (
    <header className="barra">
      <div className="contenedor">
        <div className="contenido-barra">
          <img src={logo} alt="imagen"/>
          {auth.auth ? (
            <button type="button" className="btn btn-rojo" onClick={cerrarSesion}>
              <i className="far fa-times-circle"></i>
              Cerrar sesión
            </button>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Header