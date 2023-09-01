import express from 'express'
import * as controller from '../controllers/User.controller'
import protect from '../middleware/Protect'

const router = express.Router()

  
router.post('/register', controller.userRegister)
router.post('/login', controller.userLogin)
router.get('/protected', protect, controller.protect)
router.get('/protected/:id',protect, controller.protectById)
router.put('/update/:id'  ,controller.updateUser )



export default router