const express = require('express')
const Category = require('../../models/Category')
const Record = require('../../models/Record')
const router = express.Router()

router.get('/new', async(req, res) => {
    const categories = await Category.find().lean()
    res.render('new',{categories})
})

router.post('/', async(req, res) => {
    const newExpense = req.body
    const categories = await Category.find().lean()
    targetId = categories.find( category => category.name === newExpense.category)._id
    newExpense.category = targetId
    return Record.create(newExpense)
        .then( () => res.redirect('/'))
        .catch( error => console.log(error))
})

router.get('/:_id/edit', async(req ,res) => {
    const _id =req.params._id
    const categories = await Category.find().lean()
    Record.findById(_id)
        .lean()
        .then( record => {
            res.render('edit', { record, categories})
        })
        .catch(error => console.log(error))
})

router.put('/:_id', async(req, res) => {
    const _id = req.params._id
    const newExpense = req.body
    const categories = await Category.find().lean()
    targetId = categories.find( category => category.name === newExpense.category)._id
    newExpense.category = targetId
    return Record.findById(_id)
        .then( record => {
            record = Object.assign(record , newExpense)
            return record.save()
        })
        .then( () => res.redirect('/'))
        .catch( error => console.log(error))
})

router.delete('/:_id', async(req ,res) => {
    const _id = req.params._id
    return Record.findById(_id)
        .then( record => record.remove())
        .then( () => res.redirect('/'))
        .catch( error => console.log(error))
})

module.exports = router