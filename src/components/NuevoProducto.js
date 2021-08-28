import React, {useState} from 'react';


//redux imports
import {useDispatch, useSelector} from 'react-redux';

//redux actions
import {crearNuevoProductoAction} from '../actions/productosActions';
import {mostrarAlerta, ocultarAlertaAction} from '../actions/alertaActions';


const NuevoProducto = ({history}) =>{
  //component state
  const [nombre, guardarNombre] = useState('');
  const [precio, guardarPrecio] = useState(0);

  //useDispatch
  const dispatch = useDispatch();

  //store state
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector(state => state.alerta.alerta);


  const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto));

  //user press submit
  const submitNuevoProducto = e =>{
    e.preventDefault();

    //validate
    if(nombre.trim() === '' || precio <= 0){

      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-primary text-center text-uppercase p-2'
      }
      dispatch(mostrarAlerta(alerta));

      return;
    }

    //no errors
    dispatch(ocultarAlertaAction());

    //new producto
    agregarProducto({
      nombre,
      precio
    });
    // redirection to main page
    history.push('/');
  }

  return(
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>Agregar producto</h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form
              onSubmit={submitNuevoProducto}
            >
              <div className='form-group mb-3'>
                <label>Nombre producto</label>
                <input
                  type='text'
                  className='form-control'
                  name='nombre'
                  value={nombre}
                  onChange={e => guardarNombre(e.target.value)}
                />
              </div>
              <div className='form-group mb-3'>
                <label>Precio producto</label>
                <input
                  type='number'
                  className='form-control'
                  name='precio'
                  value={precio}
                  onChange={e => guardarPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type='submit'
                className='btn-p btn btn-dark font-weight-bold'
              >Agregar
              </button>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? <p className='alert alert-primary mt-3 p-2'>Ocurrió un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoProducto;
