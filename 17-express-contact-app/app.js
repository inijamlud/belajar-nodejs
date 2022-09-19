const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact } = require('./utils/contacts')

const app = express()
const port = 3000

// third party middleware
// using ejs embedded js view
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))

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
    const contacts = loadContact()
    res.render('contact', {
        layout: 'partials/main-layout',
        title: 'Kontak',
        contacts
    })
})

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)

    res.render('detail', {
        layout: 'partials/main-layout',
        title: 'Detail Kontak',
        contact,
    })
})

app.use((req, res) => {
    res.status(404)
    res.send('Not Found')
    // res.json({ status: '404', msg: 'Not Found' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})