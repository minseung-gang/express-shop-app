import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
// import { Strategy } from 'passport-jwt';
import { User } from '../models/users.model.js'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as KakaoStrategy } from 'passport-kakao'
import dotenv from 'dotenv'

dotenv.config()

// req.login(user)
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// client => session => request
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    /* 
        done(error,user,info)
        error: 서버 에러가 있으면 에러 객체를 전달.
        user: 인증 성공 시 유저 객체를 전달.
        info: 인증 실패 시 추가 정보를 포함한 객체 전달.
      **/
    /* 콜백함수의 인자의 순서는 고정 되어있음 **/
    /* 콜백함수의 email, password는 사용자가 입력한 데이터. * */
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() })

        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` })
        }

        const isMatch = await user.comparePassword(password)

        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, { msg: 'Invalid email or password.' })
        }
      } catch (err) {
        return done(err)
      }
    }
  )
)

passport.use(
  'kakao',
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_KEY,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ kakaoId: profile.id })

        if (existingUser) {
          return done(null, existingUser)
        }
        const user = new User({
          email: profile._json.kakao_account.email,
          username: profile.displayName,
          kakaoId: profile.id,
        })

        await user.save()
        return done(null, user)
      } catch (err) {
        console.error('카카오 로그인 중 오류 발생:', err)
        return done(err)
      }
    }
  )
)

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['email', 'profile'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id })

        if (existingUser) {
          return done(null, existingUser)
        }

        const user = new User()
        user.email = profile.emails[0].value
        user.username = profile.displayName
        user.googleId = profile.id

        await user.save()

        return done(null, user)
      } catch (err) {
        console.log('err', err)
        return done(err)
      }
    }
  )
)

export default passport
