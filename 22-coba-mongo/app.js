const { MongoClient } = require("mongodb");

const ObjectId = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017";
const dbName = "coba-1";

const client = new MongoClient(url, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

client.connect((err, client) => {
   if (err) {
      return console.log("koneksi gagal");
   }

   // pilih db
   const db = client.db(dbName);

   // -------------
   // Menambahkan satu data
   // -------------
   // db.collection('mhs').insertOne({
   //    nama: "Greg",
   //    email: "Greg@gmail.com",
   // }, (err, res) => {
   //    if (err) return console.log('insert gagal');
   //    console.log(res);
   // }
   // )


   // -------------
   // Menambahkan lebih dari 1 data
   // -------------
   // db.collection('mhs').insertMany([
   //    {
   //       nama: "Greg",
   //       email: "Greg@gmail.com",
   //    },
   //    {
   //       nama: "Afiv",
   //       email: "Afiv@gmail.com",
   //    },
   // ], (err, res) => {
   //    if (err) return console.log('data gagal tambah');
   //    console.log(res);
   // })


   // -------------
   // Read all data in collect mhs
   // -------------
   // console.log(
   //    db
   //    .collection('mhs')
   //    .find().toArray((err, res) => {
   //       console.log(res);
   //    }));


   // -------------
   // Read data by criteria
   // -------------
   // console.log(
   //    db
   //       .collection('mhs')
   //       .find({ _id: ObjectId('637a30df8272703bbcb376af') })
   //       .toArray((err, res) => {
   //          console.log(res);
   //       }));


   // -------------
   // Update data by id, pake Promise
   // -------------
   // const updatePromise = db.collection("mhs").updateOne(
   //    {
   //       _id: ObjectId("637a30df8272703bbcb376af"),
   //    },
   //    {
   //       $set: {
   //          nama: "Joko",
   //          email: 'afiv@yahoo.com'
   //       },
   //    }
   // );

   // updatePromise
   //    .then((res) => console.log(res))
   //    .catch((err) => console.log(err));


   // -------------
   // Update many data by 
   // -------------
   // db.collection("mhs").updateMany(
   //    {
   //       // _id: ObjectId("637a30df8272703bbcb376af"),
   //       nama: "Greg"
   //    },
   //    {
   //       $set: {
   //          nama: "Joko",
   //          email: 'afiv@yahoo.com'
   //       },
   //    }
   // );

   
   // -------------
   // Delete One
   // -------------
   // db.collection("mhs").deleteOne(
   //    {
   //       _id: ObjectId("637a30df8272703bbcb376af"),
   //    }
   // ).then((res) => console.log(res))

   
   // -------------
   // Delete Many
   // -------------
   // db.collection("mhs").deleteMany(
   //    {
   //       nama: "Joko",
   //    }
   // ).then((res) => console.log(res))


});
