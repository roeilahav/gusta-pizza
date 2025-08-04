import express from 'express';
import { sideItemController } from '../controllers/allControllers';

const router = express.Router();

// GET /api/side-items - Get all side items
// Optional: ?category=salad or ?category=bread
router.get('/', sideItemController.getAll);

// GET /api/side-items/:id - Get single side item
router.get('/:id', sideItemController.getOne);

// POST /api/side-items - Create new side item
router.post('/', sideItemController.create);

// PUT /api/side-items/:id - Update side item
router.put('/:id', sideItemController.update);

// DELETE /api/side-items/:id - Delete side item
router.delete('/:id', sideItemController.remove);

export default router;