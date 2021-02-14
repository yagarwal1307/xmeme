//Axios instance with base URL declared
import axios from 'axios';

const instance = axios.create({
  baseURL:  process.env.REACT_APP_BACKEND_URL //Replace it with your backend URL
});

export default instance;