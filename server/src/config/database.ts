// Database connection setup - connects your app to MongoDB

import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gusta-pizza';
    
    await mongoose.connect(mongoURI);
    
    console.log('🍃 MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
    process.exit(1);
  }
};