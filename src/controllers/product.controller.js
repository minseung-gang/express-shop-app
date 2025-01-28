import ResizeImg from 'resize-img'
import { Category } from '../models/categories.model.js'
import { Product } from '../models/products.model.js'
import fs from 'fs-extra'

export async function renderAddProductPage(req, res, next) {
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

export async function deleteProduct(req, res, next) {
  const id = req.params.id
  const path = 'src/public/product-images/' + id
  try {
    await Product.findByIdAndDelete(id)
    await fs.remove(path)
    req.flash('success', '상품이 삭제되었습니다.')
    res.redirect('back')
  } catch (err) {
    next(err)
  }
}

export async function getProduct(req, res, next) {
  try {
    const categories = await Category.find()
    const { _id, title, desc, slug, category, price, image } =
      await Product.findById(req.params.id)
    const galleryDir = 'src/public/product-images/' + _id + '/gallery/thumbs'
    const galleryImages = await fs.readdir(galleryDir)

    return res.render('admin/edit-product', {
      id: _id,
      title,
      desc,
      slug,
      categories,
      category: category.replace(/\s+/g, '-').toLowerCase(),
      price,
      galleryImages,
      image,
    })
  } catch (err) {
    next(err)
  }
}

export async function postThumbImage(req, res, next) {
  const productImage = req.files.file
  const id = req.params.id
  const path =
    'src/public/product-images/' + id + '/gallery/' + req.files.file.name
  const thumbsPath =
    'src/public/product-images/' + id + '/gallery/thumbs/' + req.files.file.name

  try {
    // 원본 이미지 폴더에 넣어주기
    await productImage.mv(path)

    const buf = await ResizeImg(fs.readFileSync(path), {
      width: 100,
      height: 100,
    })

    fs.writeFileSync(thumbsPath, buf)

    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}

export async function deleteThumbImage(req, res, next) {
  const id = req.params.id
  const imageId = req.params.imageId
  const originalImage =
    'src/public/product-images/' + id + '/gallery/' + imageId
  const thumbImage =
    'src/public/product-images/' + id + '/gallery/thumbs/' + imageId
  console.log('오리지날 이미지경로', originalImage)
  console.log('썸네일 이미지 경로', thumbImage)

  try {
    await fs.remove(originalImage)
    await fs.remove(thumbImage)
    req.flash('success', '이미지가 삭제되었습니다.')
    res.redirect('/admin/products/' + id + '/edit')
  } catch (err) {
    next(err)
  }
}
