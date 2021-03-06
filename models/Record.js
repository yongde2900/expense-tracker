
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RecordSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Category'
    },
    date: {
        type: Date,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    merchant: {
        type: String,
        require :false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        index: true,
        required: true
    }
})

module.exports = mongoose.model('Record', RecordSchema)