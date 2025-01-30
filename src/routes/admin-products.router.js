import express from 'express'
import { checkAdmin } from '../middleware/auth.js'
import {
  renderAddProductPage,
  postProduct,
  getProducts,
  deleteProduct,
  getProduct,
  postThumbImage,
  deleteThumbImage,
} from '../controllers/admin-product.controller.js'

export const adminProductsRouter = express.Router()

adminProductsRouter.get('/add-product', checkAdmin, renderAddProductPage)
adminProductsRouter.get('/', checkAdmin, getProducts)
adminProductsRouter.post('/', checkAdmin, postProduct)
adminProductsRouter.delete('/:id', checkAdmin, deleteProduct)
adminProductsRouter.get('/:id/edit', checkAdmin, getProduct)
adminProductsRouter.post('/product-gallery/:id', checkAdmin, postThumbImage)
adminProductsRouter.delete('/:id/image/:imageId', checkAdmin, deleteThumbImage)
