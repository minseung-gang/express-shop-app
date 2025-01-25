import express from 'express'
import {
  initiateGoogleAuth,
  authenticateUser,
  logoutUser,
  registerUser,
  handleGoogleCallback,
  initiateKakao,
  handleKakaoCallback,
} from '../controllers/users.js'

export const usersRouter = express.Router()

usersRouter.get('/google', initiateGoogleAuth)
usersRouter.get('/google/callback', handleGoogleCallback)
usersRouter.get('/kakao/callback', handleKakaoCallback)
usersRouter.get('/kakao', initiateKakao)
usersRouter.post('/signup', registerUser)
usersRouter.post('/login', authenticateUser)
usersRouter.post('/logout', logoutUser)
