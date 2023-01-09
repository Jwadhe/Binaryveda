const express = require('express')
const router = express.Router()
const controller = require('../controller/user_controller')
const auth = require('../middleware/auth_middleware')

router.post('/signup',controller.signup)
router.post('/login',controller.login)




module.exports= router
