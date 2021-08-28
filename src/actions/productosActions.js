import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTO_EXITO,
  DESCARGA_PRODUCTO_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//crear nuevas productos
export function crearNuevoProductoAction(producto){
  return async (dispatch) =>{
    dispatch(agregarProducto());

    try {
      //adding in API
      await clienteAxios.post('/productos', producto);

      //update state
      dispatch(agregarProductoExito(producto));
      //using swal for success
      Swal.fire(
        'Exito!',
        'Producto agregado!',
        'success'
      )
    } catch (error) {
      console.log(error);
      dispatch(agregarProductoError(true));
      //using swal for error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Intenta nuevamente'
      })
    }
  }
}

const agregarProducto = () =>({
  type: AGREGAR_PRODUCTO,
  payload: true
});

//save product in BD
const agregarProductoExito = producto =>({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
})

//get an error
const agregarProductoError = estado =>({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
})

//products download of bd
export function obtnerProductosAction(){
  return async(dispatch) =>{
    dispatch(descargarProductos());

    try {
      setTimeout(async() =>{
        const respuesta = await clienteAxios.get('/productos');
        dispatch(descargaProductosExitosa(respuesta.data));
      },1500)
    } catch (error) {
      console.log(error);
      dispatch(descargaProductosError())
    }
  }
}

const descargarProductos = () =>({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
});

const descargaProductosExitosa = productos =>({
  type: DESCARGA_PRODUCTO_EXITO,
  payload: productos
});

const descargaProductosError = () =>({
  type: DESCARGA_PRODUCTO_ERROR,
  payload: true
});

//delete and select product
export function borrarProductoAction(id){
  return async(dispatch) =>{
    dispatch(obtenerProductoEliminar(id));
    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());

      //delete success
        Swal.fire(
          'Borrado!',
          'El producto fue borrado.',
          'Exitosamente'
        )
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  }
}

const obtenerProductoEliminar = id =>({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});

const eliminarProductoExito = ()=>({
  type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = ()=>({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true
});

//edit product
export function obtenerProductoEditar(producto){
  return (dispatch) =>{
    dispatch(obtenerProductoAction(producto))
  }
}

const obtenerProductoAction = producto =>({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
});

//edit product in api
export function editarProductoAction(producto){
  return async (dispatch) =>{
    dispatch(editarProducto(producto));
    try {
      const resultado = await clienteAxios.put(`/productos/${producto.id}`, producto)
      console.log(resultado);
    } catch (error) {

    }
  }
}

const editarProducto = producto =>({
  type: COMENZAR_EDICION_PRODUCTO,
  payload: producto
})
