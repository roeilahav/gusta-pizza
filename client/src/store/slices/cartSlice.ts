import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Pizza, Topping } from '../../types';

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{
      pizza: Pizza;
      selectedToppings?: Topping[];
      quantity?: number;
    }>) => {
      const { pizza, selectedToppings = [], quantity = 1 } = action.payload;
      
      // Calculate total price for this item
      const toppingsPrice = selectedToppings.reduce((sum, topping) => sum + topping.price, 0);
      const totalPrice = (pizza.price + toppingsPrice) * quantity;
      
      // Create unique ID for cart item
      const id = `${pizza._id}-${selectedToppings.map(t => t._id).join('-')}`;
      
      // Check if item already exists
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice += totalPrice;
      } else {
        state.items.push({
          id,
          pizza,
          selectedToppings,
          quantity,
          totalPrice,
        });
      }
      
      // Update totals
      state.totalItems += quantity;
      state.totalPrice += totalPrice;
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item) {
        state.totalItems -= item.quantity;
        state.totalPrice -= item.totalPrice;
        state.items = state.items.filter(item => item.id !== itemId);
      }
    },
    
    updateQuantity: (state, action: PayloadAction<{
      itemId: string;
      quantity: number;
    }>) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item && quantity > 0) {
        const pricePerItem = item.totalPrice / item.quantity;
        
        state.totalItems = state.totalItems - item.quantity + quantity;
        state.totalPrice = state.totalPrice - item.totalPrice + (pricePerItem * quantity);
        
        item.quantity = quantity;
        item.totalPrice = pricePerItem * quantity;
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;