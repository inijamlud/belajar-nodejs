// core module
// File system
const fs = require('fs')

// menulis file secara sync
// try {
//     fs.writeFileSync('data/test.txt', 'hello world sync')
// } catch (error) {
//     console.log(error);
// }


// menulis file secara async
// fs.writeFile('data/test.txt', 'hello world Async', (e) => {
//     console.log(e);
// })


// membaca file secara sync
// const data = fs.readFileSync('data/test.txt', 'utf8')
// console.log(data)


// membaca file dengan async
// fs.readFile('datas/test.txt', 'utf-8', (e, d) => {
//     if (e) throw e
//     console.log(d);
// })


// Readline
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('siapa nama anda? ', (nama) => {
    rl.question('masukkan nomor telp? ', (telp) => {
        const contact = { nama, telp }
        const file = fs.readFileSync('data/contacts.json', 'utf-8')
        const contacts = JSON.parse(file)

        contacts.push(contact)
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

        rl.close();
    })
})