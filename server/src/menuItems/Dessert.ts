import { Document } from 'mongoose';

export interface IDessert extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
}