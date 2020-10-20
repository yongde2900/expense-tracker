
const db = require('../../config/mongoose')
const Record = require('../Record')

db.once('open', () => {
    for(let i = 1; i < 5; i++){
        Record.create({
            name: `種子${i}`,
            category: '餐飲食品',
            date: `2020-10-${i}`,
            amount: 50 + i
        })
    }
    console.log('Done')
})