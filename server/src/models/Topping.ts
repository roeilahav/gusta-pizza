import mongoose, { Schema } from 'mongoose';
import { ITopping } from '../menuItems/Topping';

const ToppingSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['6', '10', '12']
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

export default mongoose.model<ITopping>('Topping', ToppingSchema);