import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //Obtener State del formulario
    const proyectosContext = useContext(proyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    //State para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: '',
    });

    //Extraer nombre de proyecto
    const {nombre} = proyecto;
    
    //Esta funcion lee el contenido del input
    const onChangeProyecto = e => {
        guardarProyecto({
           ...proyecto,
           [e.target.name] : e.target.value
        });
    }

    //Funcion que se ejecuta cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }
        
        //Agregar el state
        agregarProyecto(proyecto)

       //Reiniciar form
       guardarProyecto({
           nombre: ''
       })

    }

    //Mostrar Formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return (
      <Fragment>
         <button type="button" className="btn btn-primario btn-block" onClick={onClickFormulario}>Nuevo Proyecto</button>

         { formulario ? 
                (<form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
                    <input type="text" className="input-text" placeholder="Nuevo Proyecto" name="nombre" onChange={onChangeProyecto} value={nombre} />

                    <input type="submit" className="btn btn-primario btn-block" value="Agregar Proyecto" />
                </form>)
                : null
        }

        {errorformulario ? <p className="mensaje error">El nombre de proyecto es obligatorio</p> : null}
      </Fragment>
    );
}

export default NuevoProyecto;