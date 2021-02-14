//Axios instance with base URL declared

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://xmeme1307.herokuapp.com/'  //Replace it with your backend URL
});

export default instance;