import ResizeImg from 'resize-img'
import { Category } from '../models/categories.model.js'
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

export async function addProductToCart(req, res, next) {
  const slug = req.params.product
  try {
    // 상품의 아이디를 가지고 어디에 추가해야함
    // 어디에 추가해야할까가 관건
    // 장바구니라는 임시 저장장소가 필요한걸까?
    // 그걸 api를 통해서 누를때마다 저장하고 다시 받아오고 그런건가?
    // 나는 로컬스토리지나 세션스토리지에 저장하고 사용하는 줄 알았는데 그게아닌것같다.
    const product = await Product.findOne({ slug })

    // 처음 카트에 상품을 넣을떄
    if (!req.session.cart) {
      req.session.cart = []
      req.session.cart.push({
        title: slug,
        qty: 1,
        porice: product.price,
        image: '/product-images/' + product._id + '/' + product.image,
      })
    } else {
      let cart = req.session.cart
      let newItem = true

      // 이미 카트에 있는 상품일 때 => 한개 추가하고 loop break
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].slug === slug) {
          cart[i].qty++
          newItem = false
          break
        }
      }

      // 처음 추가하는 상품일 때
      if (newItem) {
        cart.push({
          title: slug,
          qty: 1,
          price: product.price,
          image: '/product-images' + product._id + '/' + product.image,
        })
      }
      req.flash('success', '상품이 추가되었습니다.')
      res.redirect('back')
    }
  } catch (err) {
    next(err)
  }
}
