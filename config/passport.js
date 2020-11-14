const passport = require('passport')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy

module.exports = app => {

    //初始化 passport模組
    app.use(passport.initialize())
    app.use(passport.session())

    //設定本地登入策略
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email})
            .then(user => {
                if(!user){
                    return done(null, false, {message: 'That email is not registered'})
                }
                return bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(!isMatch){
                            return done(null, false, {message:'Email or password incorrect'})
                        }
                        return done(null, user)
                    })
                    .catch(err => done(err, false))
            })
            .catch(err => done(err, false))
    }))

    //序列化與反序列化
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => done(null, user))
            .catch(err => done(err, false))
    })
}
