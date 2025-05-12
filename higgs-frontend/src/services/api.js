import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', //backend server port
  withCredentials: false, // turn auth cookies to false
});

export const deleteInteraction = (id) =>
  api.delete(`/interactions/${id}`);

export const getTweetById = (id) =>
  axios.get(`http://localhost:3000/tweets/${id}`);

export const fetchInteractions = () => api.get('/interactions');

// export const login = (username, password) => api.post('/login', { username, password });
// export const deleteInteraction = (id) => api.delete(`/db_name/${id}`);

export default api;
