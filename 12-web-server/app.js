const http = require('http')
const fs = require('fs')
const port = 3000

const render = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404)
            res.write('Error file not found')
        } else {
            res.write(data)
        }
        res.end()
    })
}

http
    .createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })

        const url = req.url

        // It could be using switch-case tho
        if (url == '/about') {
            render('./about.html', res)
        } else if (url == '/contact') {
            render('./contact.html', res)
        } else {
            render('./index.html', res)
        }
    }
    ).listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    })

