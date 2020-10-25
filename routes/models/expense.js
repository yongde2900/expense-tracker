const express = require('express')
const Category = require('../../models/Category')
const Record = require('../../models/Record')
const router = express.Router()

router.get('/new', async(req, res) => {
    categories = await Category.find().lean()
    res.render('new',{categories})
})

router.post('/', async(req, res) => {
    const newExpense = req.body
    categories = await Category.find().lean()
    targetId = categories.find( category => category.name === newExpense.category)._id
    newExpense.category = targetId
    return Record.create(newExpense)
        .then( () => res.redirect('/'))
        .catch( error => console.log(error))
})

module.exports = router