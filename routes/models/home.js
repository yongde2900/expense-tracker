const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

router.get('/', async (req, res) => {
    const _id = req.query._id
    let records
    if (!_id) {
        records = await Record.find().populate('category', 'name icon').lean()
    } else {
        const categoryName = await Category.findById(_id).lean()
        records = await Record.find({ category: categoryName }).populate('category', 'name icon').lean()
    }
    const categories = await Category.find().lean()
    res.render('index', { records, categories })
})

module.exports = router