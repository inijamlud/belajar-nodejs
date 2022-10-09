const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact, addContact, cekDuplikat, deleteContact } = require('./utils/contacts')
const { check, body, validationResult } = require('express-validator');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')


const app = express()
const port = 3000

// third party middleware
// using ejs embedded js view
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Config flash
app.use(cookieParser('secret'))
app.use(session({
    cookie: {
        maxAge: 6000
    }, secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
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
        contacts,
        msg: req.flash('msg'),
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
app.post('/contact',
    [
        body('nama').custom((value) => {
            const duplikat = cekDuplikat(value)
            if (duplikat) {
                throw new Error('Nama kontak sudah terdaftar')
            }
            return true
        }),
        check('email', 'Email tidak valid').isEmail(),
        // check('phone', 'No HP tidak valid').isMobilePhone('id-ID')
    ],
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            res.render('add-contact', {
                title: 'Add Contact',
                layout: 'layouts/main-layout',
                errors: errors.array()
            })
        } else {
            addContact(req.body)
            // kirim flash
            req.flash('msg', 'Data kontak berhasil ditambahkan')
            // console.log(req);
            res.redirect('/contact')
        }


    })

// delete contact
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama)

    // jika kontak takada
    if (!contact) {
        res.status(404)
        res.send('404')
    } else {
        deleteContact(req.params.nama)
        req.flash('msg', 'Data kontak berhasil dihapus')
        res.redirect('/contact')
    }
})


// Form ubah data kontak
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    res.render('edit-contact', {
        layout: 'layouts/main-layout',
        title: 'Edit Kontak',
        contact
    })
})


// proses ubah data
app.post('/contact/update',
    [
        body('nama').custom((value) => {
            const duplikat = cekDuplikat(value)
            if (duplikat) {
                throw new Error('Nama kontak sudah terdaftar')
            }
            return true
        }),
        check('email', 'Email tidak valid').isEmail(),
        // check('phone', 'No HP tidak valid').isMobilePhone('id-ID')
    ],
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            res.render('edit-contact', {
                title: 'Edit Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                contact: req.body
            })
        } else {
            // addContact(req.body)
            // // kirim flash
            // req.flash('msg', 'Data kontak berhasil ditambahkan')
            // res.redirect('/contact')
        }


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