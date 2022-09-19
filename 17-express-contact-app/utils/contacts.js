const fs = require('fs')

const dir = './data'
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

const filePath = './data/contacts.json'
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8')
}

// ambil semua kontak di contact.json
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts
}

// find contact by name
const findContact = (nama) => {
    const contacts = loadContact()
    const contact = contacts.find(
        (contact) => contact.nama === nama
    )
    return contact
}

module.exports = { loadContact, findContact }