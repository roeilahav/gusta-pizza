import { Document } from 'mongoose';

export interface ITopping extends Document {
  name: string;
  price: number; // 6₪, 10₪, 12₪
  category: '6' | '10' | '12'; // קטגורית מחיר
  image?: string;
  isAvailable: boolean;
}