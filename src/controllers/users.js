import passport from 'passport'
import { User } from '../models/users.model.js'
import { sendMail } from '../mail/mail.js'

export async function registerUser(req, res) {
  // user 객체를 생성
  const { email, password } = req.body
  const user = new User({ email, password })

  try {
    // user 컬렉션에 user를 저장
    await user.save()

    //이메일 보내기
    /*   sendMail(email, 'User', 'welcome') */
    return res.redirect('/login')
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Invalid data' })
    } else if (error.code === 11000) {
      // MongoDB 중복 키 에러
      return res.status(409).json({ error: 'Email already exists' })
    } else {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export function authenticateUser(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    //서버 에러
    if (err) {
      return next(err)
    }
    // 유저가 없을 때
    if (!user) {
      return res.json({ msg: info })
    }
    // 유저가 있을 때. session을 사용할 때는 req.login을 자동으로 호출해서 인증 정보를 세션에 저장.
    // 유저 모델이 할당됨 ex) req.user = user

    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      res.redirect('/products')
    })
  })(req, res, next)
}

export function logoutUser(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
}

export function initiateGoogleAuth(req, res, next) {
  console.log('구글 권한 시작')
  passport.authenticate('google')(req, res, next)
}

export function handleGoogleCallback(req, res, next) {
  passport.authenticate('google', {
    successReturnToOrRedirect: '/products',
    failureRedirect: '/login',
  })(req, res, next)
}

export function initiateKakao(req, res, next) {
  passport.authenticate('kakao')(req, res, next)
}

export function handleKakaoCallback(req, res, next) {
  passport.authenticate('kakao', {
    successReturnToOrRedirect: '/products',
    failureRedirect: '/login',
  })(req, res, next)
}
