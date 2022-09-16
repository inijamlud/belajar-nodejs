const fs = require('fs')
const validator = require('validator')
const chalk = require('chalk')

const dir = './data'
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

const filePath = './data/contacts.json'
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8')
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts
}

const simpanContact = (nama, email, noHp) => {
    // dibikin object
    const contact = { nama, email, noHp }
    const contacts = loadContact()

    // cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama)
    if (duplikat) {
        console.log(chalk.red.inverse.bold('kontak sudah terdaftar. gunakan kontak lain.'));
        return false;
    }

    // cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Email tidak valid. gunakan email lain.'));
            return false;
        }
    }

    // cek noHp
    if (noHp) {
        if (!validator.isMobilePhone(noHp, 'id-ID')) {
            console.log(chalk.red.inverse.bold('No Hp tidak valid. gunakan No Hp lain.'));
            return false;
        }
    }

    contacts.push(contact)

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    console.log(chalk.green.inverse.bold('terima kasih telah menambahkan data'));
}

// menampilkan kontak
const listContact = () => {
    const contacts = loadContact()
    console.log(chalk.blueBright.inverse.bold('Daftar Kontak'));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
    });
}

// detail kontak
const detailContact = (nama) => {
    const contacts = loadContact()

    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    )

    if (!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false
    } else {
        console.log(chalk.blue.inverse.bold(`${contact.nama}`));
        console.log(`${contact.noHp}`);
        if (contact.email) {
            console.log(`${contact.email}`);
        }
    }
}

// hapus kontak
const deleteContact = (nama) => {
    const contacts = loadContact()

    const newContact = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    )

    if (contacts.length == newContact.length) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContact))
    console.log(chalk.green.inverse.bold(`data ${nama} berhasil dihapus!`));
}

module.exports = { simpanContact, listContact, detailContact, deleteContact }