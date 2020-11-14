const express = require('express')
const methodOverride = require('method-override')
const router = express.Router()
const home = require('./models/home')
const expense = require('./models/expense')
const users = require('./models/users')
const {authenticator} = require('../middleware/auth')

router.use(methodOverride('_method'))
router.use('/expense',authenticator, expense)
router.use('/users', users)
router.use('/',authenticator, home)

module.exports = router