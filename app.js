
// Require packages and define server related varibles
const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')
const port = 3000
const app = express()

// Setting template engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

//
app.get('/', (req, res) => {
    res.render('index')
})



// Start and listen on express server
app.listen(port, ()=>{
    console.log(`Server is listening on http://localhost:${port}`)
})