const yargs = require('yargs');
const { simpanContact, listContact, detailContact, deleteContact } = require('./contacts');

yargs.command({
    command: 'add',
    describe: 'menambahkan kontak',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email lengkap',
            demandOption: false,
            type: 'string'
        },
        noHp: {
            describe: 'No hp',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        simpanContact(argv.nama, argv.email, argv.noHp)
    }
}).
    demandCommand();


// Fitur List
yargs.command({
    command: 'list',
    describe: 'menampilkan kontak berdasarkan nama',
    handler() {
        listContact()
    }
})


// Detail kontak
yargs.command({
    command: 'detail',
    describe: 'detail kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        detailContact(argv.nama)
    }
})


// hapus kontak
yargs.command({
    command: 'delete',
    describe: 'hapus kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        deleteContact(argv.nama)
    }
})


yargs.parse();