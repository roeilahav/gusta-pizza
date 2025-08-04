import { Request, Response } from 'express';
import { Model } from 'mongoose';
import SoftDrink from '../models/SoftDrink';
import BeerDrink from '../models/BeerDrink';
import WineDrink from '../models/WineDrink';

// Helper function to get the right model based on category
const getModelByCategory = (category: string): Model<any> | null => {
  switch (category) {
    case 'soft':
      return SoftDrink;
    case 'beer':
      return BeerDrink;
    case 'wine':
      return WineDrink;
    default:
      return null;
  }
};

// Get all drinks or filter by category
export const getDrinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, available } = req.query;
    
    if (category) {
      // Get drinks from specific category
      const Model = getModelByCategory(category as string);
      if (!Model) {
        res.status(400).json({
          success: false,
          message: 'Invalid category. Must be: soft, beer, or wine'
        });
        return;
      }
      
      const filter: any = {};
      if (available !== undefined) filter.isAvailable = available === 'true';
      else filter.isAvailable = true;
      
      const drinks = await Model.find(filter);
      
      res.json({
        success: true,
        data: drinks,
        count: drinks.length
      });
      
    } else {
      // Get all drinks from all categories
      const filter: any = {};
      if (available !== undefined) filter.isAvailable = available === 'true';
      else filter.isAvailable = true;
      
      const softDrinks = await SoftDrink.find(filter);
      const beerDrinks = await BeerDrink.find(filter);
      const wineDrinks = await WineDrink.find(filter);
      
      // Simple concatenation - no sorting needed
      const allDrinks = [...softDrinks, ...beerDrinks, ...wineDrinks];
      
      res.json({
        success: true,
        data: allDrinks,
        count: allDrinks.length
      });
    }
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching drinks',
      error: error.message
    });
  }
};

// Get single drink by ID
export const getDrink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Try to find in all three models
    let drink = await SoftDrink.findById(id);
    if (!drink) drink = await BeerDrink.findById(id);
    if (!drink) drink = await WineDrink.findById(id);
    
    if (!drink) {
      res.status(404).json({
        success: false,
        message: 'Drink not found'
      });
      return;
    }
    
    res.json({
      success: true,
      data: drink
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching drink',
      error: error.message
    });
  }
};

// Create new drink
export const createDrink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.body;
    
    if (!category) {
      res.status(400).json({
        success: false,
        message: 'Category is required (soft, beer, or wine)'
      });
      return;
    }
    
    const Model = getModelByCategory(category);
    if (!Model) {
      res.status(400).json({
        success: false,
        message: 'Invalid category. Must be: soft, beer, or wine'
      });
      return;
    }
    
    const drink = new Model(req.body);
    await drink.save();
    
    res.status(201).json({
      success: true,
      data: drink,
      message: `${category} drink created successfully`
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
      message: 'Error creating drink',
      error: error.message
    });
  }
};

// Update drink
export const updateDrink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Try to find and update in all three models
    let drink = await SoftDrink.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!drink) drink = await BeerDrink.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!drink) drink = await WineDrink.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    if (!drink) {
      res.status(404).json({
        success: false,
        message: 'Drink not found'
      });
      return;
    }
    
    res.json({
      success: true,
      data: drink,
      message: 'Drink updated successfully'
    });
    
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error updating drink',
      error: error.message
    });
  }
};

// Delete drink
export const deleteDrink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Try to find and delete from all three models
    let drink = await SoftDrink.findByIdAndDelete(id);
    if (!drink) drink = await BeerDrink.findByIdAndDelete(id);
    if (!drink) drink = await WineDrink.findByIdAndDelete(id);
    
    if (!drink) {
      res.status(404).json({
        success: false,
        message: 'Drink not found'
      });
      return;
    }
    
    res.json({
      success: true,
      message: 'Drink deleted successfully'
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting drink',
      error: error.message
    });
  }
};