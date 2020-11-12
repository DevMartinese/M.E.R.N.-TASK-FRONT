import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

   //Extraer proyectos de State Inicial
   const proyectosContext = useContext(proyectoContext);
   const {proyecto} = proyectosContext; 

   //Obtener la funcion del context de tarea
   const tareasContext = useContext(tareaContext);
   const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext; 

   //Extraer proyecto actual
   const [proyectoActual] = proyecto;

   //Función que se ejecuta cuando el usuario presiona el boton para eliminar tarea
   const tareaEliminada = id => {
      eliminarTarea(id, proyectoActual._id);
      obtenerTareas(proyectoActual.id);
   }

   //Funcion que modifica el estado de las tareas
   const cambiarEstado = tarea => {
       if(tarea.estado){
           tarea.estado = false;
       } 
       else {
           tarea.estado = true;
       }

       actualizarTarea(tarea);
   }

   //Agragar una tarea actual cuando el usuario desee editarla
   const seleccionarTarea = tarea => {
       guardarTareaActual(tarea);
   }

   return (
       <li className="tarea sombra">
           <p>{tarea.nombre}</p>

           <div className="estado">
              {tarea.estado ? (<button type="button" className="completo" onClick={() => cambiarEstado(tarea)}>Completo</button>) : (<button type="button" className="incompleto" onClick={() => cambiarEstado(tarea)}>Incompleto</button>) }
           </div>

           <div className="acciones">
               <button type="button" className="btn btn-primario" onClick={() => seleccionarTarea(tarea)}>Editar</button>

               <button type="button" className="btn btn-secundario" onClick={() => tareaEliminada(tarea._id)}>Eliminar</button>
           </div>
       </li>
   )
}

export default Tarea;