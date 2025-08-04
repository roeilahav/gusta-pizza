import mongoose, { Schema } from 'mongoose';
import { ISoftDrink } from '../menuItems/drinks/SoftDrink';

const SoftDrinkSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['soft'],
    default: 'soft'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<ISoftDrink>('SoftDrink', SoftDrinkSchema);