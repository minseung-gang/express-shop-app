import express from 'express'
import {
  addProductToCart,
  renderCartPage,
  updateCarteItem,
  deleteCartItem,
  clearCartAfterPayment,
} from '../controllers/cart.controller.js'

export const cartRouter = express.Router()

cartRouter.post('/:product', addProductToCart)
cartRouter.get('/checkout', renderCartPage)
cartRouter.get('/checkout/complete', clearCartAfterPayment)
cartRouter.get('/update/:product', updateCarteItem)
cartRouter.delete('/', deleteCartItem)
