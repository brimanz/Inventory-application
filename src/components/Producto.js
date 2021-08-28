import React from 'react';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';

//redux
import {useDispatch} from 'react-redux';
import {borrarProductoAction, obtenerProductoEditar} from '../actions/productosActions';

const Producto = ({producto}) =>{
  const {nombre, precio, id} = producto;

  const dispatch = useDispatch();
  const history = useHistory();

  //delete confirm
  const confirmarEliminarProducto = id =>{

    //user confirm
    Swal.fire({
        title: 'Está seguro?',
        text: "Si elimina el producto no prodrá recuperarlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        //send to action
        dispatch(borrarProductoAction(id));
      }
    });
  }

  //program redirection function
  const rediccionarEdicion = producto =>{
    dispatch(obtenerProductoEditar(producto));
    history.push(`/productos/editar/${producto.id}`)
  }



  return (
    <tr>
      <td>{nombre}</td>
      <td>$ {precio}</td>
      <td className='acciones'>
        <button
          type='button'
          onClick={() => rediccionarEdicion(producto)}
          className='btn btn-info mx-1'>
          Editar
        </button>
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => confirmarEliminarProducto(id)}
        >Eliminar</button>
      </td>
    </tr>
  );
}

export default Producto;
