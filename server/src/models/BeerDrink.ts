import mongoose, { Schema } from 'mongoose';
import { IBeerDrink } from '../menuItems/drinks/BeerDrink';

const BeerDrinkSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['beer'],
    default: 'beer'
  },
  isDraft: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    enum: ['third', 'half', 'bottle'],
    required: false
  },
  price: {
    type: Number,
    required: true,
    min: 0
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

export default mongoose.model<IBeerDrink>('BeerDrink', BeerDrinkSchema);