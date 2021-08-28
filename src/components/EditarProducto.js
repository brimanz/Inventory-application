import React, {useState, useEffect} from 'react';
import {editarProductoAction} from '../actions/productosActions';
import {useHistory} from 'react-router-dom';

//redux
import {useDispatch, useSelector} from 'react-redux';


const EditarProducto = () =>{
  const history = useHistory();
  const dispatch = useDispatch();

  //new product state
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: ''
  });

  //edit product
  const productoeditar = useSelector(state => state.productos.productoeditar);
  useEffect(() =>{
    guardarProducto(productoeditar);
  }, [productoeditar]);

  //read form data
  const onChangeFormulario = e =>{
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }


  const {nombre, precio} = producto;

  const submitEditarProducto = e =>{
    e.preventDefault();

    dispatch(editarProductoAction(producto));
    history.push('/');
  }

  return(
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>Editar producto</h2>
            <form
              onSubmit={submitEditarProducto}
            >
              <div className='form-group mb-3'>
                <label>Nombre producto</label>
                <input
                  type='text'
                  className='form-control'
                  name='nombre'
                  value={nombre}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className='form-group mb-3'>
                <label>Precio producto</label>
                <input
                  type='number'
                  className='form-control'
                  name='precio'
                  value={precio}
                  onChange={onChangeFormulario}
                />
              </div>
              <button
                type='submit'
                className='btn-p btn btn-dark font-weight-bold'
              >Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarProducto;
