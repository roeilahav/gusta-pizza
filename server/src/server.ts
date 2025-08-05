import express from 'express';
import cors from 'cors'; // הוסף את זה!
import dotenv from 'dotenv';
import { connectDB } from './config/database';

// Import all routes
import pizzaRoutes from './routes/pizzas';
import toppingRoutes from './routes/toppings';
import sideItemRoutes from './routes/sideItems';
import dessertRoutes from './routes/desserts';
import drinkRoutes from './routes/drinks';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS middleware - הוסף את זה לפני express.json()!
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Basic middleware
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🍕 Welcome to Gusta Pizza API!',
    status: 'Server is running',
    endpoints: {
      health: '/api/health',
      pizzas: '/api/pizzas',
      toppings: '/api/toppings',
      sideItems: '/api/side-items',
      desserts: '/api/desserts',
      drinks: '/api/drinks'
    },
    timestamp: new Date().toISOString()
  });
});

// Add all routes
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/toppings', toppingRoutes);
app.use('/api/side-items', sideItemRoutes);
app.use('/api/desserts', dessertRoutes);
app.use('/api/drinks', drinkRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Gusta Pizza API is running!',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health`);
  console.log(`🍕 Pizzas: http://localhost:${PORT}/api/pizzas`);
  console.log(`🧄 Toppings: http://localhost:${PORT}/api/toppings`);
  console.log(`🥗 Side Items: http://localhost:${PORT}/api/side-items`);
  console.log(`🍰 Desserts: http://localhost:${PORT}/api/desserts`);
  console.log(`🥤 Drinks: http://localhost:${PORT}/api/drinks`);
});