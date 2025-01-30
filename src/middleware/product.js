import { Category } from '../models/categories.model.js'

export async function getAllCategories(req, res, next) {
  try {
    const categories = await Category.find()
    res.locals.categories = categories
    next()
  } catch (err) {
    next(err)
  }
}
