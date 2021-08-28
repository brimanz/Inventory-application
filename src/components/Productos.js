import React, {Fragment, useEffect} from 'react';
import Producto from './Producto';

//redux imports
import {useSelector, useDispatch} from 'react-redux';
import {obtnerProductosAction} from '../actions/productosActions';


const Productos = () =>{

  const dispatch = useDispatch();

  //using useeffect hook
  useEffect(() =>{
    //api call
    const cargarProductos = () => dispatch(obtnerProductosAction())
    cargarProductos();
  }, []);

  //obtain state
  const productos = useSelector(state => state.productos.productos);
  const error = useSelector(state => state.productos.error);
  const cargando = useSelector(state => state.productos.loading);


  return(
    <Fragment>
      <h2 className='text-center mt-5'>Listado de productos</h2>
      {error ? <p className='font-weight-bold alert alert-primary text-center p-2'>Ocurrio un error</p> : null}
      {cargando ? <p className='text-center'>Cargando...</p> : null}

      <table className='table table-striped'>
        <thead className='bg-dark'>
          <tr>
            <th scope='col'>Nombre</th>
            <th scope='col'>Precio</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? 'No hay productos' : (
            productos.map(producto =>(
              <Producto
                key={producto.id}
                producto={producto}
              />
            ))
          )}
        </tbody>
      </table>
    </Fragment>
  );
}


export default Productos;
