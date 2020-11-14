const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const passport = require('passport')
const router = express.Router()
const saltRounds = 10

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const {name, email, password, confirmPassword} = req.body
    if(!name || !email || !password || !confirmPassword){
        console.log('必填')
        return res.render('register', {name, email, password ,confirmPassword})
    }
    if(password !== confirmPassword){
        console.log('不相符')
        return res.render('register', {name, email, password ,confirmPassword})
    }
    User.findOne({email})
        .then(user => {
            if(user){
                console.log('這個 Email 已經註冊過了。')
                return res.render('register', {name, email, password ,confirmPassword})
            }
            return bcrypt.genSalt(saltRounds)
                .then(salt => bcrypt.hash(password, salt))
                .then(hash => User.create({name, email, password: hash}))
                .then(() => res.redirect('/users/login'))
                .catch(err => console.log(err))
        })
})

module.exports = router