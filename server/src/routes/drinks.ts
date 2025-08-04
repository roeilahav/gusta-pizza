import express from 'express';
import { drinkController } from '../controllers/allControllers';

const router = express.Router();

// GET /api/drinks - Get all drinks
// Optional: ?category=soft or ?category=beer or ?category=wine
router.get('/', drinkController.getDrinks);

// GET /api/drinks/:id - Get single drink
router.get('/:id', drinkController.getDrink);

// POST /api/drinks - Create new drink
router.post('/', drinkController.createDrink);

// PUT /api/drinks/:id - Update drink
router.put('/:id', drinkController.updateDrink);

// DELETE /api/drinks/:id - Delete drink
router.delete('/:id', drinkController.deleteDrink);

export default router;