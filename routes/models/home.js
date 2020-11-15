const express = require('express')
const router = express.Router()
const {dateFormat} = require('../../utilities/utility')
const Record = require('../../models/Record')
const Category = require('../../models/Category')

router.get('/', (req, res) => {
    const _id = req.query._id
    const userId = req.user._id
    let totalAmount = 0
    Record.find({userId})
        .populate('category', 'name icon')
        .lean()
        .then(record => {
            Category.find()
                .lean()
                .then(category => {
                    if (!_id) {
                        record.forEach(record => {
                            totalAmount += record.amount
                            record = dateFormat(record)
                        })
                    }else{
                        record = record.filter(select => {
                            return String(select.category._id) === _id})
                        record.forEach(record => {
                            totalAmount += record.amount
                            record = dateFormat(record)
                        })
                    }
                    res.render('index', {record, category, totalAmount})
                })
        })

})

module.exports = router