import React, {useContext, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

   //Obtener State de proyectos
   const proyectosContext = useContext(ProyectoContext);
   const {mensaje, proyectos, obtenerProyectos} = proyectosContext;

   const alertaContext = useContext(AlertaContext);
   const {alerta, mostrarAlerta} = alertaContext;

   useEffect(() => {
      if(mensaje){
         mostrarAlerta(mensaje.msg, mensaje.categoria);
      }

      obtenerProyectos();
      //eslint-disable-next-line
   }, [mensaje]);

   //Revisar si proyectos tiene contenido
   if(proyectos.length === 0) return <span>No hay Proyectos</span>;

   return (
      <ul className="listado-proyectos">
         {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      
         <TransitionGroup>
            {proyectos.map(proyecto => (
              <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
                 <Proyecto proyecto={proyecto} />
              </CSSTransition>
            ))} 
         </TransitionGroup>
      </ul>
   );
}

export default ListadoProyectos;