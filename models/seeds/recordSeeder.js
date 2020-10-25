
const db = require('../../config/mongoose')
const Record = require('../Record')
const recordData = [
    {
    name: '午餐',
    category: '餐飲食品',
    date: '2020-10-01',
    amount: 60
},
    {
        name: '晚餐',
        category: '餐飲食品',
        data: '2020-10-02',
        amount: 70, 
    },
    {
        name: '捷運',
        category: '交通出行',
        data: '2020-10-02',
        amount: 20, 
    },
    {
        name: '電影',
        category: '休閒娛樂',
        data: '2020-10-03',
        amount: 260, 
    },
    {
        name: '租金',
        category: '家居物業',
        data: '2020-10-05',
        amount: 250000, 
    }
]

db.once('open', () => {
    console.log('execute recordSeeder')
    Record.insertMany(recordData)
        .then( () => db.close())
    console.log('Done')
})