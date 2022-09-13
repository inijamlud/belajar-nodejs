const { questions, simpanContact } = require('./contacts')

const main = async () => {
    const nama = await questions('Masukkan nama anda:')
    const email = await questions('masukkan email anda:')
    const noHp = await questions('masukkan noHp anda:')

    simpanContact(nama, email, noHp)
}

main()