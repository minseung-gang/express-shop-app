import express from 'express'

export const productsRouter = express.Router()

productsRouter.use('/', (req, res) => {
  res.render('products')
})
