const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const passport = require('passport')
const router = express.Router()
const saltRounds = 10

router.get('/ss', (req, res) => {
    res.send('aaa')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash:true
}))

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const {name, email, password, confirmPassword} = req.body
    const errors = []
    if(!name || !email || !password || !confirmPassword){
        errors.push({message: '所有欄位皆是必填！'})
    }
    if(password !== confirmPassword){
        errors.push({message: '密碼與確認密碼不相符！'})
    }
    if (errors.length) {
        return res.render('register', {errors,name, email, password ,confirmPassword})
    }
    User.findOne({email})
        .then(user => {
            if(user){
                errors.push({message: '這個 Email 已經註冊過了。'})
                return res.render('register', {errors, name, email, password ,confirmPassword})
            }
            return bcrypt.genSalt(saltRounds)
                .then(salt => bcrypt.hash(password, salt))
                .then(hash => User.create({name, email, password: hash}))
                .then(() => res.redirect('/users/login'))
                .catch(err => console.log(err))
        })
})

module.exports = router