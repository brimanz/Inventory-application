import React from 'react';
import {Link} from 'react-router-dom';



const Header = () =>{
  return(
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark justify-content-between'>
      <div className='container'>
        <h1>
          <Link
            to={'/'}
            >Inventario de Productos
          </Link>
        </h1>
      </div>
      <Link
        to={'/productos/nuevo'}
        className='btn btn-info nuevo-post d-block d-md-inline-block'
        >Add Product &#43;
      </Link>
    </nav>
  );
}


export default Header;
