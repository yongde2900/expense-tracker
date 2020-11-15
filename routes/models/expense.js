const express = require('express')
const Category = require('../../models/Category')
const Record = require('../../models/Record')
const {dateFormat, judgeObj} = require('../../utilities/utility')
const router = express.Router()

router.get('/new', (req, res) => {
    Category.find()
        .lean()
        .then( category => res.render('new', { category }))
})

router.post('/', (req, res) => {
    const newExpense = req.body
    const userId = req.user._id
    newExpense.userId = userId
    Category.findOne({name: newExpense.category})
        .lean()
        .then(category => {
            newExpense.category = category._id
            Record.create(newExpense)
        })
        .catch(err => console.log(err))
    res.redirect('/')
})

router.get('/:_id/edit', (req ,res) => {
    const _id = req.params._id
    Category.find()
        .lean()
        .then(category => {
            console.log(category)
            Record.findById(_id)
            .lean()
            .then(record =>{
                console.log(record)
                record = dateFormat(record)
                console.log(record.date)
                res.render('edit', { record, category})
            })
        })
        .catch(err => console.log(err))
})

router.put('/:_id', (req, res) => {
    const _id = req.params._id
    const newExpense = req.body
    Category.findOne({name: newExpense.category})
        .then(category => {
            Record.findById(_id)
                .then(record => {
                    console.log('@@!',newExpense, category)
                    newExpense.category = category._id
                    record = Object.assign(record, newExpense)
                    record.save()
                })
        })
    res.redirect('/')
})

router.delete('/:_id',(req ,res) => {
    const _id = req.params._id
    return Record.findById(_id)
        .then( record => record.remove())
        .then( () => res.redirect('/'))
        .catch( error => console.log(error))
})

router.post('/filter', (req, res) => {
    const filter = req.body
    let condition = {}
    let date = {}
    let totalAmount = 0
    condition.userId =  req.user._id
    if(filter.category){
        condition.category = filter.category
    }
    if(filter.startDate){
        date.$gte = filter.startDate
    }
    if(filter.endDate){
        date.$lte = filter.endDate
    }
    if(judgeObj(date)){
        condition.date = date
    }

    Record.find(condition)
        .sort({ date: 1 })
        .populate('category', 'name icon')
        .lean()
        .then(record => {
            Category.find()
                .lean()
                .then(category => {
                    record.forEach(record => {
                        totalAmount += record.amount
                        record = dateFormat(record)
                    })
                    res.render('index', {record, category, totalAmount, date})
                })
        })
        .catch(err => console.log(err))
})
module.exports = router