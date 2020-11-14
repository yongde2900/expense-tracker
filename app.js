
// Require packages and define server related varibles
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
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
usePassport(app)
app.use(routes)




// Start and listen on express server
app.listen(PORT, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`)
})