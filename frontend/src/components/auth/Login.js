import React, {useContext, useState} from 'react';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import clienteAxios from '../../config/axios';

import { CRMContext } from '../../context/CRMContext';

function Login(){
    // Auth y token
    const [auth, guardarAuth] = useContext(CRMContext);
    let navigate = useNavigate();
    const [ credenciales, guardarCredenciales] = useState({});

    const iniciarSesion = async e => {
        e.preventDefault();

        try {
            const respuesta = await clienteAxios.post('/users/auth', credenciales);
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            //colocar en el state
            guardarAuth({
                token,
                auth: true
            })

            Swal.fire(
                'Login Correcto',
                'Has iniciado sesión',
                'success'
            )

            navigate('/', {replace:true});
            
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data.mensaje
              })
        }
    }

    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    return(
    <div className='Login'>
        <h2>Iniciar sesión</h2>

        <div className='contenedor-formulario'>
            <form onSubmit={iniciarSesion}>
                <div className='campo'>
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email para iniciar sesión" required onChange={leerDatos}/>
                </div>
                <div className='campo'>
                    <label>Contraseña</label>
                    <input type="password" name="password" placeholder="Contraseña para iniciar sesión" required onChange={leerDatos}/>
                </div>
                <input type="submit" value="Iniciar sesión" className="btn btn-verde btn-block" />
            </form>
        </div>
    </div>)
}

export default Login;