import express from 'express';
import { dessertController } from '../controllers/allControllers';

const router = express.Router();

// GET /api/desserts - Get all desserts
router.get('/', dessertController.getAll);

// GET /api/desserts/:id - Get single dessert
router.get('/:id', dessertController.getOne);

// POST /api/desserts - Create new dessert
router.post('/', dessertController.create);

// PUT /api/desserts/:id - Update dessert
router.put('/:id', dessertController.update);

// DELETE /api/desserts/:id - Delete dessert
router.delete('/:id', dessertController.remove);

export default router;