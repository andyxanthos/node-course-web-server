const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

hbs.registerPartials(__dirname + '/views/partials')


app.set('view engine', 'hbs')
app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Could not write to the log.')
    })
    console.log(log)
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () =>  new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home',
        welcomeMsg: 'Welcome to this site.',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMsg: 'Error handling this request.'
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000.')
})