import express from 'express'
import { getAllCategories } from '../middleware/product.js'
import {
  renderProductPage,
  renderCategoryPage,
  renderProductsPage,
} from '../controllers/product.controller.js'

export const productsRouter = express.Router()

productsRouter.get('/', getAllCategories, renderProductsPage)
productsRouter.get('/:category', getAllCategories, renderCategoryPage)
productsRouter.get('/:category/:product', renderProductPage)
