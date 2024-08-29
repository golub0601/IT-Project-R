import express from 'express'
import { login ,register, logout } from '../controllers/auth_controller.js'

const router = express.Router()

router.get('/login', login)
router.get('/logout', logout)
router.post('/register', register)


export default router