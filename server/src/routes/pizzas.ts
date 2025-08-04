import express from 'express';
import { pizzaController } from '../controllers/allControllers';

const router = express.Router();

// GET /api/pizzas - Get all pizzas
router.get('/', pizzaController.getAll);

// GET /api/pizzas/:id - Get single pizza
router.get('/:id', pizzaController.getOne);

// POST /api/pizzas - Create new pizza
router.post('/', pizzaController.create);

// PUT /api/pizzas/:id - Update pizza
router.put('/:id', pizzaController.update);

// DELETE /api/pizzas/:id - Delete pizza
router.delete('/:id', pizzaController.remove);

export default router;