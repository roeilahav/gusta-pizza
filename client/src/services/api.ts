import axios from 'axios';
import { 
  ApiResponse, 
  Pizza, 
  Topping, 
  Drink, 
  SideItem, 
  Dessert 
} from '../types';

// Base URL for your backend
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// =================== PIZZA API ===================
export const pizzaAPI = {
  getAllPizzas: () => api.get<ApiResponse<Pizza[]>>('/pizzas'),
  
  getPizza: (id: string) => api.get<ApiResponse<Pizza>>(`/pizzas/${id}`),
  
  createPizza: (pizza: Partial<Pizza>) => 
    api.post<ApiResponse<Pizza>>('/pizzas', pizza),
    
  updatePizza: (id: string, pizza: Partial<Pizza>) => 
    api.put<ApiResponse<Pizza>>(`/pizzas/${id}`, pizza),
    
  deletePizza: (id: string) => 
    api.delete<ApiResponse<void>>(`/pizzas/${id}`),
};

// =================== TOPPING API ===================
export const toppingAPI = {
  getAllToppings: () => api.get<ApiResponse<Topping[]>>('/toppings'),
  
  getToppingsByCategory: (category: '6' | '10' | '12') => 
    api.get<ApiResponse<Topping[]>>(`/toppings?category=${category}`),
    
  getTopping: (id: string) => api.get<ApiResponse<Topping>>(`/toppings/${id}`),
  
  createTopping: (topping: Partial<Topping>) => 
    api.post<ApiResponse<Topping>>('/toppings', topping),
};

// =================== DRINK API ===================
export const drinkAPI = {
  getAllDrinks: () => api.get<ApiResponse<Drink[]>>('/drinks'),
    
  getDrinksByCategory: (category: 'soft' | 'beer' | 'wine') => 
    api.get<ApiResponse<Drink[]>>(`/drinks?category=${category}`),
    
  getDrink: (id: string) => api.get<ApiResponse<Drink>>(`/drinks/${id}`),
  
  createDrink: (drink: any) => 
    api.post<ApiResponse<Drink>>('/drinks', drink),
};

// =================== SIDE ITEM API ===================
export const sideItemAPI = {
  getAllSideItems: () => api.get<ApiResponse<SideItem[]>>('/side-items'),
  
  getSideItemsByCategory: (category: 'salad' | 'bread') => 
    api.get<ApiResponse<SideItem[]>>(`/side-items?category=${category}`),
    
  getSideItem: (id: string) => api.get<ApiResponse<SideItem>>(`/side-items/${id}`),
  
  createSideItem: (sideItem: Partial<SideItem>) => 
    api.post<ApiResponse<SideItem>>('/side-items', sideItem),
};

// =================== DESSERT API ===================
export const dessertAPI = {
  getAllDesserts: () => api.get<ApiResponse<Dessert[]>>('/desserts'),
  
  getDessert: (id: string) => api.get<ApiResponse<Dessert>>(`/desserts/${id}`),
  
  createDessert: (dessert: Partial<Dessert>) => 
    api.post<ApiResponse<Dessert>>('/desserts', dessert),
};

// =================== HEALTH CHECK ===================
export const healthAPI = {
  checkHealth: () => api.get('/health'),
};

export default api;