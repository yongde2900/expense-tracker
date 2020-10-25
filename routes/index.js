const express = require('express')
const methodOverride = require('method-override')
const router = express.Router()
const home = require('./models/home')
const expense = require('./models/expense')

router.use(methodOverride('_method'))
router.use('/', home)
router.use('/expense', expense)

module.exports = router