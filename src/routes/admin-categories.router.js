import express from 'express'
import { checkAdmin } from '../middleware/auth.js'
import {
  addCategory,
  postCategory,
  getCategories,
  deleteCategory,
} from '../controllers/category.controller.js'

export const adminCategoryRouter = express.Router()

adminCategoryRouter.get('/', checkAdmin, getCategories)
adminCategoryRouter.get('/add-category', checkAdmin, addCategory)
adminCategoryRouter.post('/add-category', checkAdmin, postCategory)
adminCategoryRouter.delete('/:id', checkAdmin, deleteCategory)
