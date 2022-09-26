const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact } = require('./utils/contacts')

const app = express()
const port = 3000

// third party middleware
// using ejs embedded js view
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(express.json()) // for parsing application/json

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
        layout: 'layouts/main-layout',
        nama: 'jamal',
        title: 'Home',
        mhs,
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'about'
    })

})

app.get('/contact', (req, res) => {
    const contacts = loadContact()
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Kontak',
        contacts
    })
})

// form add contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: 'Tambah Kontak',
    })
})

// proses add
app.post('/contact', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})


// detail kontak
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)

    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Detail Kontak',
        contact,
    })
})


app.use((req, res) => {
    res.status(404)
    res.send('Page Not Found')
    // res.json({ status: '404', msg: 'Not Found' })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})