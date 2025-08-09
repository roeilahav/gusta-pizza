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