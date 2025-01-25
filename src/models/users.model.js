import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  kakaoId: {
    type: String,
    unique: true,
    sparse: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  admin: {
    type: Number,
    // 0 => 일반유저, 1 => 관리자
    default: 0,
  },
})

userSchema.pre('save', function (next) {
  let user = this
  if (user.isModified('password')) {
    // salt를 생성
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

// methods => Mongoose 스키마의 내장 프로퍼티로, Mongoose 문서의 프로토타입에 메서드를 추가하기 위한 단순한 API 역할.
// 모든 인스턴스에서 사용할 메서드를 정의하는 용도.
// new User로 생성된 모든 문서 인스턴스가 해당 메서드를 상속받아 사용하는 방식.
userSchema.methods.comparePassword = async function (plainPassword) {
  // plainPassword: 사용자가 입력한 비밀번호
  // this.password: 데이터베이스에서 조회된 사용자의 비밀번호
  return await bcrypt.compare(plainPassword, this.password)
}

export const User = mongoose.model('User', userSchema)
