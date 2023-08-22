import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { monthlyCalculation } from '../controllers/calculationsController.js';

const router = express.Router()

router.route('/month/weeks/:property/:user/:year/:month').get(authMiddleware, monthlyCalculation)

export default router