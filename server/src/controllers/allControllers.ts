// Business logic handlers - the "brain" that processes requests and talks to database


import { createCrudController } from './baseCrudController';
import Pizza from '../models/Pizza';
import Topping from '../models/Topping';
import SideItem from '../models/SideItem';
import Dessert from '../models/Dessert';

// Import the special drink controller
import * as drinkController from './drinkController';

// Generate controllers for simple models
export const pizzaController = createCrudController(Pizza, 'Pizza');
export const toppingController = createCrudController(Topping, 'Topping');
export const sideItemController = createCrudController(SideItem, 'Side Item');
export const dessertController = createCrudController(Dessert, 'Dessert');

// Export the special drink controller
export { drinkController };