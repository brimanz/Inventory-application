import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'http://localhost:1600/'
});

export default clienteAxios;
