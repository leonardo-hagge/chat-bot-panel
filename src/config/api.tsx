
import axios from 'axios';


const baseURL = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL,
    timeout: 5000, // Defina um timeout adequado, se necessário
});

export default api;