import { IDrinkBase } from "./DrinkBase";
export interface IWineDrink extends IDrinkBase {
  category: 'wine';
  winery?: string;
  origin?: string;
  price: {
    glass: number;
    bottle: number;
  };
}
