import React, {Fragment, useContext} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoTareas = () => {
    //Extraer proyectos de State Inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    //Obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;

    //Si no hay un proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>

    //Array Extructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto; 

    //const tareasProyectos = [];

    //Elimincion de un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return (
       <Fragment>
           <h2>Proyecto: {proyectoActual.nombre}</h2>

           <ul className="listado-tareas">
              {tareasproyecto.length === 0
              
                  ? (<li className="tarea"><p>No hay tareas</p></li>)
              
                  : <TransitionGroup>
                      {tareasproyecto.map(tarea => (
                        <CSSTransition key={tarea.id} timeout={200} classNames="tarea">    
                           <Tarea tarea={tarea} />
                        </CSSTransition>
                      ))}
                    </TransitionGroup>

              }
           </ul>

           <button type="button" onClick={onClickEliminar} className="btn btn-eliminar">Eliminar Proyecto &times;</button>
       </Fragment>
    );
}

export default ListadoTareas;