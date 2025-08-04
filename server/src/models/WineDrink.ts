import mongoose, { Schema } from 'mongoose';
import { IWineDrink } from '../menuItems/drinks/WineDrink';

const WineDrinkSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['wine'],
    default: 'wine'
  },
  winery: {
    type: String,
    required: false,
    trim: true
  },
  origin: {
    type: String,
    required: false,
    trim: true
  },
  price: {
    glass: {
      type: Number,
      required: true,
      min: 0
    },
    bottle: {
      type: Number,
      required: true,
      min: 0
    }
  },
  alcoholPercentage: {
    type: Number,
    min: 0,
    max: 100,
    required: false
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

export default mongoose.model<IWineDrink>('WineDrink', WineDrinkSchema);