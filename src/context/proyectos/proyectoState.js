import React, { useReducer } from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

import clientAxios from '../../config/axios';

import {FORMULARIO_PROYECTO, OBTENER_PROYECTO, AGREGAR_PROYECTO, PROYECTO_ERROR, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO} from '../../types';

const ProyectoState = props => {

    const initialState = {
        proyectos : [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    } 

    //Dispatch para ejecutar las acciones 
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener Proyectos
    const obtenerProyectos = async () => {
        try {
            const resultado = await clientAxios.get('/api/proyectos');
            console.log(resultado);
         
            dispatch({
                type: OBTENER_PROYECTO,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Agregar Proyectos
    const agregarProyecto = async proyecto => {
        try {
            const resultado = await clientAxios.post('/api/proyectos', proyecto);
            console.log(resultado);

            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Validar formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        });
    }

    //Selecciona el proyecto a eliminar
    const eliminarProyecto = async proyectoId => {
        try {
            await clientAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un Error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

   return (
   <proyectoContext.Provider value={{proyectos: state.proyectos, formulario: state.formulario, errorformulario: state.errorformulario, proyecto: state.proyecto, mensaje: state.mensaje, mostrarFormulario, obtenerProyectos, agregarProyecto, mostrarError, proyectoActual, eliminarProyecto}}>
        {props.children}
    </proyectoContext.Provider> )
}

export default ProyectoState;