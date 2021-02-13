import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://xmeme1307.herokuapp.com/'
});

export default instance;