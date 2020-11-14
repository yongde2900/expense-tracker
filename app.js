
// Require packages and define server related varibles
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const session = require('express-session')
const flash = require('connect-flash')
require('./config/mongoose')
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const usePassport = require('./config/passport')

// Setting template engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

//
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
  }))
usePassport(app)
app.use(flash())
app.use((req,res, next) =>{
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    res.locals.warning_msg = req.flash('error')
    next()
})
app.use(routes)




// Start and listen on express server
app.listen(PORT, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`)
})