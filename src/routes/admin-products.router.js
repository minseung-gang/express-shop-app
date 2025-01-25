import express from 'express'
import { checkAdmin } from '../middleware/auth.js'
import {
  getCategories,
  postProduct,
  getProducts,
} from '../controllers/product.controller.js'

export const adminProductsRouter = express.Router()

adminProductsRouter.get('/add-product', checkAdmin, getCategories)
adminProductsRouter.get('/', checkAdmin, getProducts)
adminProductsRouter.post('/', checkAdmin, postProduct)
