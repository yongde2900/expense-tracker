
const db = require('../../config/mongoose')
const Record = require('../Record')
const Category = require('../Category')
const User = require('../User')
const bcrypt = require('bcryptjs')
const saltRounds = 10
const recordData = [
    {
        name: '午餐',
        category: '餐飲食品',
        date: '2020-10-01',
        merchant: '西提',
        amount: 60
    },
    {
        name: '晚餐',
        category: '餐飲食品',
        date: '2020-11-02',
        merchant: '西提',
        amount: 70,
    },
    {
        name: '捷運',
        category: '交通出行',
        date: '2020-11-02',
        merchant: '台鐵',
        amount: 20,
    },
    {
        name: '電影',
        category: '休閒娛樂',
        date: '2020-11-03',
        merchant: '威秀',
        amount: 260,
    },
    {
        name: '租金',
        category: '家居物業',
        date: '2020-11-05',
        amount: 250000,
    }
]
const exampleUser = {
    name: 'user1',
    email: 'example1@test.test',
    password: '1234567'
}

db.once('open', () => {
    console.log('execute recordSeeder')
    bcrypt.genSalt(saltRounds)
        .then(salt => bcrypt.hash(exampleUser.password, salt))
        .then(hash => {
            exampleUser.password = hash
            User.create(exampleUser)
                .then(user => {
                    Category.find()
                        .lean()
                        .then(category => {
                            recordData.forEach(record => {
                                record.userId = user._id
                                record.category = category.find(category => category.name === record.category)._id
                            })
                            return Record.insertMany(recordData)
                        })
                        .then(() => {
                            console.log('Done')
                            process.exit()
                        })
                })
        })
})