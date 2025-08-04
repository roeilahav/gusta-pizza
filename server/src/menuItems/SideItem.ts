import { Document } from 'mongoose';

export interface ISideItem extends Document {
  name: string;
  description: string;
  price: number;
  category: 'salad' | 'bread'; // סלט או לחם
  ingredients?: string[];
  image: string;
  isAvailable: boolean;
}