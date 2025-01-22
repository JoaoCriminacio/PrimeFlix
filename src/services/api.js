import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// URL da API: movie/now_playing?api_key=9f63e7bf4e90be1464e746c2b530d227&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
