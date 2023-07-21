import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { creatOwnerships, getOwnerships, getOwnershipsById, updateOwnerships, deleteOwnerships, getOwnershipsByUser } from '../controllers/OwnershipsController.js';

const router = express.Router()

router.route('/')
	.post(authMiddleware, creatOwnerships)
	.get(authMiddleware, getOwnerships)

router.route('/:id')
	.get(authMiddleware, getOwnershipsById)
	.put(authMiddleware, updateOwnerships)
	.delete(authMiddleware, deleteOwnerships)

router.route('/user/:user').get(authMiddleware, getOwnershipsByUser)

export default router