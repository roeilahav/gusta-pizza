import { Request, Response } from 'express';
import { Document, Model } from 'mongoose';

export interface CrudController {
  getAll: (req: Request, res: Response) => Promise<void>;
  getOne: (req: Request, res: Response) => Promise<void>;
  create: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  remove: (req: Request, res: Response) => Promise<void>;
}

export function createCrudController<T extends Document>(
  Model: Model<T>,
  resourceName: string
): CrudController {
  
  return {
    // Get all items
    async getAll(req: Request, res: Response): Promise<void> {
      try {
        const { category, available, search, page = '1', limit = '20' } = req.query;
        
        // Build filter
        const filter: any = {};
        
        if (category) filter.category = category;
        if (available !== undefined) filter.isAvailable = available === 'true';
        if (search) filter.$text = { $search: search as string };
        
        // Default to available items if no filter specified
        if (!available) filter.isAvailable = true;
        
        // Pagination
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;
        
        // Execute query
        const items = await Model.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNum);
        
        const total = await Model.countDocuments(filter);
        
        res.json({
          success: true,
          data: items,
          count: items.length,
          pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            pages: Math.ceil(total / limitNum)
          }
        });
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: `Error fetching ${resourceName}`,
          error: error.message
        });
      }
    },

    // Get single item by ID
    async getOne(req: Request, res: Response): Promise<void> {
      try {
        const { id } = req.params;
        const item = await Model.findById(id);
        
        if (!item) {
          res.status(404).json({
            success: false,
            message: `${resourceName} not found`
          });
          return;
        }
        
        res.json({
          success: true,
          data: item
        });
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: `Error fetching ${resourceName}`,
          error: error.message
        });
      }
    },

    // Create new item
    async create(req: Request, res: Response): Promise<void> {
      try {
        const item = new Model(req.body);
        await item.save();
        
        res.status(201).json({
          success: true,
          data: item,
          message: `${resourceName} created successfully`
        });
      } catch (error: any) {
        if (error.name === 'ValidationError') {
          res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: Object.values(error.errors).map((err: any) => err.message)
          });
          return;
        }
        
        res.status(400).json({
          success: false,
          message: `Error creating ${resourceName}`,
          error: error.message
        });
      }
    },

    // Update item
    async update(req: Request, res: Response): Promise<void> {
      try {
        const { id } = req.params;
        const item = await Model.findByIdAndUpdate(id, req.body, { 
          new: true, 
          runValidators: true 
        });
        
        if (!item) {
          res.status(404).json({
            success: false,
            message: `${resourceName} not found`
          });
          return;
        }
        
        res.json({
          success: true,
          data: item,
          message: `${resourceName} updated successfully`
        });
      } catch (error: any) {
        if (error.name === 'ValidationError') {
          res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: Object.values(error.errors).map((err: any) => err.message)
          });
          return;
        }
        
        res.status(400).json({
          success: false,
          message: `Error updating ${resourceName}`,
          error: error.message
        });
      }
    },

    // Delete item
    async remove(req: Request, res: Response): Promise<void> {
      try {
        const { id } = req.params;
        const item = await Model.findByIdAndDelete(id);
        
        if (!item) {
          res.status(404).json({
            success: false,
            message: `${resourceName} not found`
          });
          return;
        }
        
        res.json({
          success: true,
          message: `${resourceName} deleted successfully`
        });
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: `Error deleting ${resourceName}`,
          error: error.message
        });
      }
    }
  };
}