import { ReactNode } from "react";

// Base types
export interface IDrinkBase {
  _id: string;
  name: string;
  image?: string;
  isAvailable: boolean;
  category: 'soft' | 'beer' | 'wine';
}

// Drink types
export interface ISoftDrink extends IDrinkBase {
  category: 'soft';
  price: number;
}

export interface IBeerDrink extends IDrinkBase {
  category: 'beer';
  isDraft?: boolean;
  size: 'third' | 'half' | 'bottle';
  price: number;
}

export interface IWineDrink extends IDrinkBase {
  category: 'wine';
  winery?: string;
  origin?: string;
  price: {
    glass: number;
    bottle: number;
  };
}

export type IDrink = ISoftDrink | IBeerDrink | IWineDrink;

// Menu types
export interface IPizza {
  _id: string;
  name: string;
  description: string;
  price: number;
  size?: 'regular' | 'personal';
  toppings: ITopping[];
  isSpecial?: boolean;
  isVegan?: boolean;
  image: string;
  isAvailable: boolean;
}

export interface ITopping {
  _id: string;
  name: string;
  price: number;
  category: '6' | '10' | '12';
  image?: string;
  isAvailable: boolean;
}

export interface IDessert {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
}

export interface ISideItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'salad' | 'bread';
  ingredients?: string[];
  image: string;
  isAvailable: boolean;
}

// Cart types
export interface ICartPizza {
  id: string;
  type: 'pizza';
  item: IPizza;
  quantity: number;
  selectedToppings: ITopping[];
  specialInstructions?: string;
}

export interface ICartDrink {
  id: string;
  type: 'drink';
  item: IDrink;
  quantity: number;
  size?: 'glass' | 'bottle';
}

export interface ICartDessert {
  id: string;
  type: 'dessert';
  item: IDessert;
  quantity: number;
}

export interface ICartSideItem {
  id: string;
  type: 'side';
  item: ISideItem;
  quantity: number;
}

export type ICartItem = ICartPizza | ICartDrink | ICartDessert | ICartSideItem;

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface CartContextType {
  items: ICartItem[];
  addPizza: (pizza: IPizza, toppings: ITopping[], quantity: number, instructions?: string) => void;
  addDrink: (drink: IDrink, quantity: number, size?: 'glass' | 'bottle') => void;
  addDessert: (dessert: IDessert, quantity: number) => void;
  addSideItem: (sideItem: ISideItem, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export interface DrinkCardProps {
  drinks: IDrink[];
}

export interface DessertCardProps {
  desserts: IDessert[];
}

export interface DeliveryForm {
  fullName: string;
  phone: string;
  street: string;
  houseNumber: string;
  city: string;
  floor?: string;
  apartment?: string;
  notes?: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface PizzaCardProps {
  pizzas: IPizza[];
}

export interface SideItemCardProps {
  sideItems: ISideItem[];
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface CartProviderProps {
  children: ReactNode;
}
