const express = require('express')
const router = express.Router()
const home = require('./models/home')
const expense = require('./models/expense')

router.use('/', home)
router.use('/expense', expense)

module.exports = router