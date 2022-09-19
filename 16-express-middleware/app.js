const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000

// using ejs embedded js view
app.set('view engine', 'ejs')

// third party middleware
app.use(expressLayouts)
app.use(morgan('dev'))
// Built-in middleware
app.use(express.static('public'))

// App-level middleware
app.use((req, res, next) => {
    console.log(Date.now());
    next()
})

app.get('/', (req, res) => {
    // res.sendFile('./index.html', { root: __dirname })
    const mhs = [
        {
            nama: 'Jamal',
            email: 'jamal@gmail.com'
        },
        {
            nama: 'Google',
            email: 'google@gmail.com'
        },
        {
            nama: 'Firshum',
            email: 'figk@gmail.com'
        },
    ]
    res.render('index', {
        layout: 'partials/main-layout',
        nama: 'jaal',
        title: 'Home',
        mhs,
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'partials/main-layout',
        title: 'about'
    })

})

app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'partials/main-layout',
        title: 'Kontak'
    })
})

app.get('/product/:id', (req, res) => {
    res.send('product id =' + req.params.id + '// ' + req.query.cat)
})

app.use((req, res) => {
    res.status(404)
    res.send('Not Found')
    // res.json({ status: '404', msg: 'Not Found' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})