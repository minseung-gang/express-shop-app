import mongoose from 'mongoose'

export const cateogrySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
})

export const Category = mongoose.model('Category', cateogrySchema)
