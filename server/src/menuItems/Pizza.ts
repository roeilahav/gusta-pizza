import { Document } from 'mongoose';
import { ITopping } from './Topping';

export interface IPizza extends Document {
  name: string;
  description: string;
  price: number;
  size?: 'regular' | 'personal';
  toppings: ITopping[]; // תוספות שנבחרו בפועל ע"י המשתמש
  isSpecial?: boolean;
  isVegan?: boolean;
  image: string;
  isAvailable: boolean;
}

