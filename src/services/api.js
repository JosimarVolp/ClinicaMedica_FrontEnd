import axios from 'axios';

const api = axios.create({
    
    baseURL: 'https://clinicamedica-backend.herokuapp.com/api/'
});

export default api;