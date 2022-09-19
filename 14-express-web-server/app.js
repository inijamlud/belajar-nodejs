const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.sendFile('./index.html', { root: __dirname })
})

app.get('/about', (req, res) => {
    res.sendFile('./about.html', { root: __dirname })
    // res.send('Wooh About Page!')
})

app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', { root: __dirname })
    // res.send('Yash contact Page!')
})

app.get('/product/:id', (req, res) => {
    res.send('product id =' + req.params.id + '// ' + req.query.cat)
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('Not Found')
    // res.json({
    //     status: '404',
    //     msg: 'Not Found'
    // })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// const http = require('http')
// const fs = require('fs')
// const port = 3000

// const render = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             res.writeHead(404)
//             res.write('Error file not found')
//         } else {
//             res.write(data)
//         }
//         res.end()
//     })
// }

// http
//     .createServer((req, res) => {
//         res.writeHead(200, {
//             'Content-Type': 'text/html'
//         })

//         const url = req.url

//         // It could be using switch-case tho
//         if (url == '/about') {
//             render('./about.html', res)
//         } else if (url == '/contact') {
//             render('./contact.html', res)
//         } else {
//             render('./index.html', res)
//         }
//     }
//     ).listen(port, () => {
//         console.log(`Server is listening on port ${port}`);
//     })

