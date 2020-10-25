
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
        default: Date.now,
        require: true
    },
    amount: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Record', RecordSchema)