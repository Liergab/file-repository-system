import express from 'express'
import * as controller from '../controllers/User.controller'
import protect from '../middleware/Protect'

const router = express.Router()

router.post('/register', controller.userRegister)
router.post('/login', controller.userLogin)
router.get('/Protected', protect, controller.protects)

export default router