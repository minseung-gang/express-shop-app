import { Category } from '../models/categories.model.js'

export function addCategory(req, res, next) {
  res.render('admin/add-category')
}

export async function postCategory(req, res, next) {
  try {
    const title = req.body.title
    const slug = title.replace(/\s+/g, '-').toLowerCase()
    const category = await Category.findOne({ slug })

    if (category) {
      req.flash(
        'error',
        '카테고리 제목이 존재합니다. 다른 제목을 사용해주세요.'
      )
      return res.redirect('back')
    }
    // new category
    const newCategory = new Category({
      title,
      slug,
    })
    await newCategory.save()
    req.flash('success', '카테고리가 추가되었습니다.')
    return res.redirect('/admin/categories')
  } catch (err) {
    next(err)
  }
}

export async function getCategories(req, res, next) {
  try {
    const categories = await Category.find()
    res.render('admin/categories', { categories })
  } catch (err) {
    next(err)
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const response = await Category.findByIdAndDelete(req.params.id)
    // 카테고리 존재 x
    if (!response) {
      req.flash('error', '해당 카테고리가 존재하지 않습니다.')
      return res.redirect('/admin/categories')
    }

    req.flash('success', '카테고리가 삭제되었습니다.')
    res.redirect('/admin/categories')
  } catch (err) {
    // db 오류 등 예외 발생
    next(err)
  }
}
