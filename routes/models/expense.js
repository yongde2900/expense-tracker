const express = require('express')
const Category = require('../../models/Category')
const Record = require('../../models/Record')
const router = express.Router()

router.get('/new', (req, res) => {
    Category.find()
        .lean()
        .then( category => res.render('new', { category }))
})

router.post('/', async(req, res) => {
    const newExpense = req.body
    const categories = await Category.find().lean()
    const targetId = categories.find( category => category.name === newExpense.category)._id
    newExpense.category = targetId
    await Record.create(newExpense)
    res.redirect('/')
})

router.get('/:_id/edit', async(req ,res) => {
    const _id = req.params._id
    const categories = await Category.find().lean()
    const record = await Record.findById(_id).lean()
    res.render('edit', { record, categories})
})

router.put('/:_id', async(req, res) => {
    const _id = req.params._id
    const newExpense = req.body
    const categories = await Category.find().lean()
    let record = await Record.findById(_id)
    const targetId = categories.find( category => category.name === newExpense.category)._id
    newExpense.category = targetId
    record = Object.assign(record , newExpense)
    await record.save()
    res.redirect('/')
})

router.delete('/:_id', async(req ,res) => {
    const _id = req.params._id
    return Record.findById(_id)
        .then( record => record.remove())
        .then( () => res.redirect('/'))
        .catch( error => console.log(error))
})

module.exports = router