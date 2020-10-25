
// Require packages and define server related varibles
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
require('./config/mongoose')
const port = 3000
const routes = require('./routes')

// Setting template engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

//
app.use(bodyParser.urlencoded({extended: true}))
app.use(routes)




// Start and listen on express server
app.listen(port, ()=>{
    console.log(`Server is listening on http://localhost:${port}`)
})