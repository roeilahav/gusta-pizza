// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

// =================== PIZZA TYPES ===================
// Matches backend/src/menuItems/Pizza.ts
export interface Pizza {
  _id: string;
  name: string;
  description: string;
  price: number;
  size?: 'regular' | 'personal';
  toppings?: string[];
  image: string;
  isSpecial?: boolean;
  isVegan?: boolean;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// =================== TOPPING TYPES ===================
// Matches backend/src/menuItems/Topping.ts
export interface Topping {
  _id: string;
  name: string;
  price: number;
  category: '6' | '10' | '12';
  image?: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// =================== DRINK TYPES ===================
// Base interface - matches backend/src/menuItems/drinks/DrinkBase.ts
export interface DrinkBase {
  _id: string;
  name: string;
  image?: string;
  isAvailable: boolean;
  category: 'soft' | 'beer' | 'wine';
  createdAt?: string;
  updatedAt?: string;
}

// Matches backend/src/menuItems/drinks/SoftDrink.ts
export interface SoftDrink extends DrinkBase {
  category: 'soft';
  price: number;
}

// Matches backend/src/menuItems/drinks/BeerDrink.ts
export interface BeerDrink extends DrinkBase {
  category: 'beer';
  isDraft?: boolean;
  size?: 'third' | 'half' | 'bottle';
  price: number;
  alcoholPercentage?: number;
}

// Matches backend/src/menuItems/drinks/WineDrink.ts
export interface WineDrink extends DrinkBase {
  category: 'wine';
  winery?: string;
  origin?: string;
  price: {
    glass: number;
    bottle: number;
  };
  alcoholPercentage?: number;
  wineDetails?: {
    color: 'white' | 'red' | 'rose';
    region: string;
    vintage?: number;
  };
}

// Union type for all drinks
export type Drink = SoftDrink | BeerDrink | WineDrink;

// =================== SIDE ITEM TYPES ===================
// Matches backend/src/menuItems/SideItem.ts
export interface SideItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'salad' | 'bread';
  ingredients?: string[];
  image: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// =================== DESSERT TYPES ===================
// Matches backend/src/menuItems/Dessert.ts
export interface Dessert {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// =================== CART TYPES ===================
export interface CartItem {
  pizza: Pizza;
  quantity: number;
  selectedToppings?: Topping[];
  totalPrice: number;
  id: string; // unique cart item id
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}