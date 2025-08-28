import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ICartItem, IPizza, IDrink, IDessert, ISideItem, ITopping, IWineDrink, CartContextType, CartProviderProps } from '../types';
import { useSnackbar } from 'notistack';



const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<ICartItem[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('gustapizza-cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('gustapizza-cart', JSON.stringify(items));
  }, [items]);

  const addPizza = (pizza: IPizza, toppings: ITopping[], quantity: number, instructions?: string) => {
    const newItem: ICartItem = {
      id: `pizza-${Date.now()}`,
      type: 'pizza',
      item: pizza,
      selectedToppings: toppings,
      quantity,
      specialInstructions: instructions,
    };
    setItems([...items, newItem]);
    enqueueSnackbar(`${pizza.name} נוסף לעגלה`, { variant: 'success' });
  };

  const addDrink = (drink: IDrink, quantity: number, size?: 'glass' | 'bottle') => {
    const newItem: ICartItem = {
      id: `drink-${Date.now()}`,
      type: 'drink',
      item: drink,
      quantity,
      size,
    };
    setItems([...items, newItem]);
    enqueueSnackbar(`${drink.name} נוסף לעגלה`, { variant: 'success' });
  };

  const addDessert = (dessert: IDessert, quantity: number) => {
    const newItem: ICartItem = {
      id: `dessert-${Date.now()}`,
      type: 'dessert',
      item: dessert,
      quantity,
    };
    setItems([...items, newItem]);
    enqueueSnackbar(`${dessert.name} נוסף לעגלה`, { variant: 'success' });
  };

  const addSideItem = (sideItem: ISideItem, quantity: number) => {
    const newItem: ICartItem = {
      id: `side-${Date.now()}`,
      type: 'side',
      item: sideItem,
      quantity,
    };
    setItems([...items, newItem]);
    enqueueSnackbar(`${sideItem.name} נוסף לעגלה`, { variant: 'success' });
  };

  const removeItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
    enqueueSnackbar('הפריט הוסר מהעגלה', { variant: 'info' });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems(items.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('gustapizza-cart');
  };

  const getTotalPrice = () => {
    return items.reduce((total, cartItem) => {
      let itemPrice = 0;
      
      switch (cartItem.type) {
        case 'pizza':
          itemPrice = cartItem.item.price;
          // Add toppings price
          itemPrice += cartItem.selectedToppings.reduce((sum, topping) => sum + topping.price, 0);
          break;
        case 'drink':
          const drink = cartItem.item;
          if (drink.category === 'wine') {
            const wineDrink = drink as IWineDrink;
            itemPrice = cartItem.size === 'bottle' ? wineDrink.price.bottle : wineDrink.price.glass;
          } else {
            itemPrice = (drink as any).price;
          }
          break;
        case 'dessert':
        case 'side':
          itemPrice = cartItem.item.price;
          break;
      }
      
      return total + (itemPrice * cartItem.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    items,
    addPizza,
    addDrink,
    addDessert,
    addSideItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};