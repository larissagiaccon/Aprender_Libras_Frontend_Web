import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_HOST_API_URL}`,
  // baseURL: 'http://localhost:3333',
});

export default api;
