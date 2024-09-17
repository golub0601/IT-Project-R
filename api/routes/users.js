import express from 'express'
import { allUsers } from '../controllers/user_controller.js'

const router = express.Router()

router.get('/', allUsers)

export default router