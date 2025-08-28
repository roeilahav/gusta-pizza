import axios from 'axios';
import { 
  IPizza, 
  IDrink, 
  IDessert, 
  ISideItem, 
  ITopping, 
  ApiResponse 
} from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const menuAPI = {
  // Pizzas
  getPizzas: () => api.get<ApiResponse<IPizza[]>>('/pizzas'),
  getPizzaById: (id: string) => api.get<ApiResponse<IPizza>>(`/pizzas/${id}`),
  
  // Drinks
  getDrinks: () => api.get<ApiResponse<IDrink[]>>('/drinks'),
  
  // Desserts
  getDesserts: () => api.get<ApiResponse<IDessert[]>>('/desserts'),
  
  // Side Items
  getSideItems: () => api.get<ApiResponse<ISideItem[]>>('/side-items'),
  
  // Toppings
  getToppings: () => api.get<ApiResponse<ITopping[]>>('/toppings'),
};

export default api;