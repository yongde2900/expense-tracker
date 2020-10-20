const express = require('express')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Record', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('mongodb is error!'))
db.once('open', () => console.log('mongodb is connected!'))
module.exports = db