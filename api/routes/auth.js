import express from 'express'
import { login ,register, logout } from '../controllers/auth_controller.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.post('/register', register)


export default router