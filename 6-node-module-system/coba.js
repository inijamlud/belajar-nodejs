// const sayHello = () => {
//     console.log('hello Coba')
// }

function sayHello(name = 'Pughya') {
    return `hello namanya ${name}`
}

const PI = 3.14

const mhs = {
    nama: 'Mal',
    umur: 22,
    cetakMhs() {
        return `Hallo nama saya ${this.nama}, ${this.umur} tahun.`
    }
}

class Orang {
    constructor() {
        console.log('objek orang telag dibuat');
    }
}

// module.exports.sayHello = sayHello
// module.exports.PI = PI
// module.exports.mhs = mhs
// module.exports.Orang = Orang

module.exports = { sayHello, PI, mhs, Orang }



// sayHello()