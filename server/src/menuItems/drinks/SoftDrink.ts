import { IDrinkBase } from "./DrinkBase";

export interface ISoftDrink extends IDrinkBase {
  category: 'soft';
  price: number;
}
