import mongoose, { Schema } from 'mongoose';
import { ISideItem } from '../menuItems/SideItem';

const SideItemSchema: Schema = new Schema({
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
  category: {
    type: String,
    required: true,
    enum: ['salad', 'bread']
  },
  ingredients: [{
    type: String
  }],
  image: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<ISideItem>('SideItem', SideItemSchema);