import { Category } from '../models/categories.model.js'
import { Product } from '../models/products.model.js'
import fs from 'fs-extra'

export async function getCategories(req, res, next) {
  try {
    const categories = await Category.find()

    res.render('admin/add-product', {
      categories,
    })
  } catch (err) {
    next(err)
  }
}

export async function getProducts(req, res, next) {
  try {
    const products = await Product.find()
    res.render('admin/products', {
      products,
    })
  } catch (err) {
    next(err)
  }
}

export async function postProduct(req, res, next) {
  const imageFile =
    typeof req.files?.image !== 'undefined' ? req.files.image.name : ''
  const { title, desc, price, category } = req.body
  const slug = imageFile.replace(/\s+/g, '-').toLowerCase()

  // 데이터 베이스에 저장
  // 새로운 인스턴스를 만드는 이유 => 객체의 데이터를 수정한 후 저장.
  const newProduct = new Product({
    title,
    desc,
    price,
    category,
    slug,
    image: imageFile,
  })
  try {
    await newProduct.save()

    await fs.mkdir('src/public/product-images/' + newProduct._id, {
      recursive: true,
    })
    await fs.mkdir('src/public/product-images/' + newProduct._id + '/gallery')
    await fs.mkdir(
      'src/public/product-images/' + newProduct._id + '/gallery/thumbs'
    )

    // 이미지 파일을 폴더에 넣어주기
    const path = 'src/public/product-images/' + newProduct._id + '/' + imageFile
    const productImage = req.files.image
    await productImage.mv(path)

    req.flash('success', '상품이 추가되었습니다.')
    res.redirect('/admin/products')
  } catch (err) {
    next(err)
  }
}
