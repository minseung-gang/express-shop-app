import { Product } from '../models/products.model.js'
import fs from 'fs-extra'

export async function renderProductsPage(req, res, next) {
  try {
    const products = await Product.find()
    res.render('products', {
      products,
    })
  } catch (err) {
    next(err)
  }
}

export async function renderCategoryPage(req, res, next) {
  const categorySlug = req.params.category
  try {
    const products = await Product.find({ category: categorySlug })
    res.render('products', {
      products,
    })
  } catch (err) {
    next(err)
  }
}

export async function renderProductPage(req, res, next) {
  try {
    const product = await Product.findOne({ slug: req.params.product })

    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' })
    }

    const galleryDir = 'src/public/product-images/' + product._id + '/gallery'
    const galleryImages = await fs.readdir(galleryDir)

    res.render('product', {
      product,
      galleryImages,
    })
  } catch (err) {
    next(err)
  }
}
