import mongoose, { Schema } from 'mongoose';
import { IPizza } from '../menuItems/Pizza';

const PizzaSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  size: {
    type: String,
    enum: ['regular', 'personal'],
    required: false
  },

  // needs to be <ITopping[]> type
  toppings: [{
    type: String
  }],
  image: {
    type: String,
    required: true
  },
  isSpecial: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IPizza>('Pizza', PizzaSchema);