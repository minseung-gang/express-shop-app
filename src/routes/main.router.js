import express from 'express'
import {
  checkAuthenticated,
  checkNotAuthenticated,
} from '../middleware/auth.js'

export const mainRouter = express.Router()

mainRouter.get('/', (req, res) => {
  res.redirect('/products')
})
mainRouter.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('auth/login')
})
mainRouter.get('/signup', checkNotAuthenticated, (req, res) => {
  res.render('auth/signup')
})
