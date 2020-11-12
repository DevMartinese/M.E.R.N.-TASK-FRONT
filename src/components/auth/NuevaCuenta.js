import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { autenticado, mensaje, registrarUsuario } = authContext

    //En caso de registro o logueo exitoso o usuario duplicado
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

    }, [mensaje, autenticado, props.history, mostrarAlerta])

    //State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    //Extraer de usuario
    const {nombre, email, password, confirmar} = usuario; 

    const onChange = e => {
       guardarUsuario({
           ...usuario,
           [e.target.name] : e.target.value
       })
    }

    const onSubmit = e => {
        e.preventDefault();

        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        if(password.length < 6){
           mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
           return;
        }

        if(password !== confirmar){
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }

        registrarUsuario({
            nombre,
            email,
            password
        })
    }

   return (
       <div className="form-usuario">
          {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }

          <div className="contenedor-form sombra-dark">
              <h1>Obtener Cuenta</h1>

              <form onSubmit={onSubmit}>
                  <div className="campo-form">
                     <label htmlFor="nombre">Nombre: </label>
                     <input type="text" id="nombre" name="nombre" value={nombre} placeholder="Tu Nombre" onChange={onChange} />
                  </div>

                  <div className="campo-form">
                     <label htmlFor="email">E-mail: </label>
                     <input type="email" id="email" name="email" value={email} placeholder="Tu E-mail" onChange={onChange} />
                  </div>

                  <div className="campo-form">
                     <label htmlFor="password">Contraseña: </label>
                     <input type="password" id="password" name="password" value={password} placeholder="Tu contraseña" onChange={onChange} />
                  </div>

                  <div className="campo-form">
                     <label htmlFor="confirmar">Confirmar Contraseña: </label>
                     <input type="password" id="confirmar" name="confirmar" value={confirmar} placeholder="Confirma tu contraseña:" onChange={onChange} />
                  </div>

                  <div className="campo-form">
                     <input type="submit" className="btn btn-primario btn-block" value="Registrarme" />
                  </div>
              </form>

              <Link to='/' className="enlace-cuenta">
                  Iniciar Sesión
              </Link>
          </div>
       </div>
   )

}

export default NuevaCuenta;