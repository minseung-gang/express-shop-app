import { Product } from '../models/products.model.js'

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
        price: product.price,
        image: '/product-images/' + product._id + '/' + product.image,
      })
    } else {
      let cart = req.session.cart
      let newItem = true

      // 이미 카트에 있는 상품일 때 => 한개 추가하고 loop break
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].title === slug) {
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
          image: '/product-images/' + product._id + '/' + product.image,
        })
      }
    }
    req.flash('success', '상품이 추가되었습니다.')
    res.redirect('back')
  } catch (err) {
    next(err)
  }
}

export function renderCartPage(req, res) {
  res.render('checkout')
}

export function updateCarteItem(req, res) {
  const slug = req.params.product
  const action = req.query.action
  let cart = req.session.cart

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].title === slug) {
      switch (action) {
        case 'add':
          console.log('추가-현재 qty값', cart[i].qty)
          cart[i].qty++
          break
        case 'remove':
          cart[i].qty--
          if (cart[i].qty < 1) {
            cart[i].qty = Math.max(cart[i].qty - 1, 1)
          }
          break
        case 'clear':
          cart.splice(i, 1)
          if (cart.length === 0) {
            delete req.session.cart
          }
          break
        default:
          console.log('올바른 action을 넣어주세요')
          break
      }
      break
    }
  }
  req.flash('success', '장바구니가 업데이트되었습니다.')
  res.redirect('back')
}

export function deleteCartItem(req, res) {
  delete req.session.cart

  req.flash('success', '장바구니가 비워졌습니다.')
  res.redirect('back')
}

export function clearCartAfterPayment(req, res) {
  delete req.session.cart
  res.redirect('/products')
}
