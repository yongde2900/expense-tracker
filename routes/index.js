const express = require('express')
const methodOverride = require('method-override')
const router = express.Router()
const home = require('./models/home')
const expense = require('./models/expense')
const users = require('./models/users')

router.use(methodOverride('_method'))
router.use('/', home)
router.use('/expense', expense)
router.use('/users', users)

module.exports = router