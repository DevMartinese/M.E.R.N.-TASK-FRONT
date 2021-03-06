import React, { useReducer } from 'react';
import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import {TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA} from '../../types';

import clientAxios from '../../config/axios';

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Crear las funciones

    //Obtener las tareas de un Proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clientAxios.get('/api/tareas', {params: {proyecto}});
            console.log(resultado);

            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            }) 
        } catch (error) {
            console.log(error);
        }
    }

    //Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const resultado = await clientAxios.post('/api/tareas', tarea);
            console.log(resultado);

            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Validación de Tarea
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por Id
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clientAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    //Edicion o modificacion de tarea
    const actualizarTarea = async tarea => {
        try {
            const resultado = await clientAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(resultado);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Estrae una tarea para edición
    const guardarTareaActual = tarea => {
       dispatch({
           type: TAREA_ACTUAL,
           payload: tarea
       })
    }

    //Elimina tarea seleccionada
    
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (
        <tareaContext.Provider value={{tareasproyecto: state.tareasproyecto,
                                       errortarea: state.errortarea,
                                       tareaseleccionada: state.tareaseleccionada, 
                                       obtenerTareas, 
                                       agregarTarea, 
                                       validarTarea, 
                                       eliminarTarea, 
                                       guardarTareaActual,
                                       actualizarTarea,
                                       limpiarTarea}}>
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState;