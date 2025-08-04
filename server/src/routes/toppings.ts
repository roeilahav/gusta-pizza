import express from 'express';
import { toppingController } from '../controllers/allControllers';

const router = express.Router();

// GET /api/toppings - Get all toppings
// Optional: ?category=6 or ?category=10 or ?category=12
router.get('/', toppingController.getAll);

// GET /api/toppings/:id - Get single topping
router.get('/:id', toppingController.getOne);

// POST /api/toppings - Create new topping
router.post('/', toppingController.create);

// PUT /api/toppings/:id - Update topping
router.put('/:id', toppingController.update);

// DELETE /api/toppings/:id - Delete topping
router.delete('/:id', toppingController.remove);

export default router;