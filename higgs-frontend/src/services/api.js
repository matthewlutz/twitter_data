import axios from 'axios';

const api = axios.create({
  baseURL: '/', //backend server port
  withCredentials: false, // turn auth cookies to false
});

export const deleteInteraction = (id) =>
  api.delete(`/interactions/${id}`);

export const getTweetById = (id) =>
  api.get(`/tweet/${id}`);

export const createInteraction = (data) =>
  api.post('/interactions', data);

export const updateInteraction = (id, data) =>
  axios.put(`http://localhost:3000/interactions/${id}`, data);

export const fetchInteractions = () => api.get('/api');

// export const login = (username, password) => api.post('/login', { username, password });
// export const deleteInteraction = (id) => api.delete(`/db_name/${id}`);

export default api;
