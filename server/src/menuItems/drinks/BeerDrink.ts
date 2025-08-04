import { IDrinkBase } from "./DrinkBase";

export interface IBeerDrink extends IDrinkBase {
  category: 'beer';
  isDraft?: boolean;
  size: 'third' | 'half' | 'bottle'; // optional if needed
  price: number;
}
