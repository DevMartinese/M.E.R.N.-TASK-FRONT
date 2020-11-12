import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //Extraer proyectos de State Inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const {tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext;

    //Effect que detecta si hay una tarea selecionada
    useEffect(() => {
       if(tareaseleccionada !== null){
           guardarTarea(tareaseleccionada);
       } 
       else {
           guardarTarea({
               nombre: ''
           })
       }
    }, [tareaseleccionada])

    //State del Formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

    const {nombre} = tarea;

    //Si no hay un proyecto seleccionado
    if(!proyecto) return null

    //Array Extructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;
    
    //Leer valores del Formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
       e.preventDefault();
       
       //Validación
       if(nombre.trim() === ""){
           validarTarea();
           return;
       }

       //Si es edición o agregado de tarea
       if(tareaseleccionada == null){
           //Se agrega una nueva tarea al state de tareas
           tarea.proyecto = proyectoActual._id;
           agregarTarea(tarea);
       } else {
           //Actualiza tarea existente
           actualizarTarea(tarea); 

           //Elimina tarea seleccionada del state
           limpiarTarea();
       }

       //Obtener y filtrar las tareas de proyecto actual
       obtenerTareas(proyectoActual.id);

       //Reinicio del Form
       guardarTarea({
           nombre: ''
       })
    }

    return (
       <div className="formulario">
           <form onSubmit={onSubmit} >
               <div className="contenedor-input">
                   <input type="text" className="input-text"  placeholder="Nombre Tarea.." name="nombre" value={nombre} onChange={handleChange} />
               </div>

               <div className="contenedor-input">
                   <input type="submit" className="btn btn-submit btn-primario btn-block" value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"} />
               </div>
           </form>
         
           {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}       
       </div>
    );
}

export default FormTarea;