
const db = require('../../config/mongoose')
const Record = require('../Record')
const Category = require('../Category')
const recordData = [
    {
    name: '午餐',
    category: '餐飲食品',
    date: '2020/10/01',
    amount: 60
},
    {
        name: '晚餐',
        category: '餐飲食品',
        date: '2020/10/02',
        amount: 70, 
    },
    {
        name: '捷運',
        category: '交通出行',
        date: '2020/10/02',
        amount: 20, 
    },
    {
        name: '電影',
        category: '休閒娛樂',
        date: '2020/10/03',
        amount: 260, 
    },
    {
        name: '租金',
        category: '家居物業',
        date: '2020/10/05',
        amount: 250000, 
    }
]

db.once('open', async () => {
    console.log('execute recordSeeder')
    const categories = await Category.find().lean()
    for( const records of recordData){
        targetId = categories.find(category => records.category === category.name)._id
        records.category = targetId
    }  
    Record.insertMany(recordData)
        .then( () => db.close())
    console.log('Done')
})