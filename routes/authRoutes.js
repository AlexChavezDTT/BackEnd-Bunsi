import express from 'express'
import { register, verifyAccount, login, user, update } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)

//Area privada - requiere JWT
router.get('/user', authMiddleware, user)
router.put('/update/:user', authMiddleware, update)

export default router