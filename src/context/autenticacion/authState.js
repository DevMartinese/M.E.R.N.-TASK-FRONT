import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { REGISTRO_EXITOSO, REGISTRO_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION } from '../../types/index';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);
    
    const registrarUsuario = async datos => {
       try {
           const respuesta = await clientAxios.post('/api/usuarios', datos);
           console.log(respuesta.data);

           dispatch({
               type: REGISTRO_EXITOSO,
               payload: respuesta.data
           })

           //Obtener Usuario
           usuarioAutenticado();
       } catch (error) {
           const alerta = {
               msg: error.response.data.msg,
               categoria: 'alerta-error'
           }

           dispatch({
               type: REGISTRO_ERROR,
               payload: alerta
           })
       }
    }

    const usuarioAutenticado = async () => {
       const token = localStorage.getItem('token');
       if(token){
        tokenAuth(token);
       }

       try {
           const respuesta = await clientAxios.get('/api/auth');
           console.log(respuesta);
           dispatch({
               type: OBTENER_USUARIO,
               payload: respuesta.data
           })
       } catch (error) {
           console.log(error.response);
           dispatch({
               type: LOGIN_ERROR
           })
       }
    }

    const iniciarSesion = async datos => {
        try {
            const respuesta =  await clientAxios.post('/api/auth', datos);
            console.log(respuesta);

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            usuarioAutenticado();
        } catch (error) {
            console.error(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
 
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }


    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
       <authContext.Provider value={{token: state.token, autenticado: state.autenticado, usuario: state.usuario, mensaje: state.mensaje, cargando: state.cargando, registrarUsuario, iniciarSesion, usuarioAutenticado, cerrarSesion}}>
           {props.children}
       </authContext.Provider>
    )
}

export default AuthState;