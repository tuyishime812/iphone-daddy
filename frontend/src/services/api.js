import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add token to headers
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`)
};

export const merchandiseService = {
  getAll: () => api.get('/merchandise'),
  getById: (id) => api.get(`/merchandise/${id}`),
  create: (data) => api.post('/merchandise', data),
  update: (id, data) => api.put(`/merchandise/${id}`, data),
  delete: (id) => api.delete(`/merchandise/${id}`)
};

export const authService = {
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth')
};

export const chatService = {
  sendMessage: (data) => api.post('/chat', data)
};

export const orderService = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/myorders'),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  update: (id, data) => api.put(`/orders/${id}`, data),
  delete: (id) => api.delete(`/orders/${id}`)
};

export default api;