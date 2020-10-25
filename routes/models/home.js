const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

router.get('/', async (req, res) => {
    const records = await Record.find().populate('category', 'name icon').lean()
    const categories = await Category.find().lean()
    res.render('index', {records, categories})
})
module.exports = router