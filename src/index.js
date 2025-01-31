import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { usersRouter } from './routes/users.js'
import passport from './config/passport.js'
/* import cookieSession from 'cookie-session' */
import session from 'express-session'
import config from 'config'
import flash from 'connect-flash'
import { mainRouter } from './routes/main.router.js'
import { adminCategoryRouter } from './routes/admin-categories.router.js'
import { adminProductsRouter } from './routes/admin-products.router.js'
import { productsRouter } from './routes/products.router.js'
import { cartRouter } from './routes/cart.router.js'
import methodOverride from 'method-override'
import fileUpload from 'express-fileupload'

dotenv.config()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const serverConfig = config.get('server')

/* app.use(
  cookieSession({
    name: 'cookie-session-name',
    keys: [process.env.COOKIE_ENCRYPTION_KEY],
  })
)

app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb()
    }
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb()
    }
  }
  next()
}) */
app.use(
  session({
    secret: process.env.COOKIE_ENCRYPTION_KEY,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'shop-app-cookie',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(fileUpload())

// form태그 에서 버튼 클릭했을때 데이터를 받아오기 위해서
app.use(methodOverride('_method')) //form 태그 method 변환 _method=DELETE

mongoose
  .connect(process.env.MONGOOSE_PASSWORD)
  .then(() => {
    console.log('mongoDB connected')
  })
  .catch((err) => console.log(err))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.locals.error = req.flash('error')
  res.locals.success = req.flash('success')
  res.locals.currentUser = req.user
  res.locals.cart = req.session.cart
  next()
})

app.use('/', mainRouter)
app.use('/auth', usersRouter)
app.use('/admin/categories', adminCategoryRouter)
app.use('/products', productsRouter)
app.use('/admin/products', adminProductsRouter)
app.use('/cart', cartRouter)

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || '서버에서 오류가 발생했습니다.',
  })
})

const port = serverConfig.port

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
