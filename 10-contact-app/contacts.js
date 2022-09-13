const fs = require('fs')

// Readline
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const dir = './data'
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

const filePath = './data/contacts.json'
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8')
}

const questions = (que) => {
    return new Promise((resolve, reject) => {
        rl.question(que, (nama) => {
            resolve(nama)
        })
    })
}

const simpanContact = (nama, email, noHp) => {
    // dibikin object
    const contact = { nama, email, noHp }

    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    contacts.push(contact)

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

    rl.close();
}

module.exports = { questions, simpanContact }