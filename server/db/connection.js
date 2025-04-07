//import { MongoClient, ServerApiVersion } from "mongodb";
//
//const uri = process.env.ATLAS_URI || "";
//const client = new MongoClient(uri, {
//  serverApi: {
//    version: ServerApiVersion.v1,
//    strict: true,
//    deprecationErrors: true,
//  },
//});
//
//try {
//  // Connect the client to the server
//  await client.connect();
//  // Send a ping to confirm a successful connection
//  await client.db("admin").command({ ping: 1 });
//  console.log(
//   "Pinged your deployment. You successfully connected to MongoDB!"
//  );
//} catch(err) {
//  console.error(err);
//}
//
//const db = client.db("employees");
//
//
//
//// TESTI
//const dbTest = client.db("sample_guides");
//
//const Userdb = await client.db("users");
//
//
//
//export {db, dbTest, Userdb};


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" }); // Määritä tiedoston nimi oikein

dotenv.config(); // Lataa ympäristömuuttujat .env-tiedostosta
console.log("ATLAS_URI:", process.env.ATLAS_URI);
const uri = process.env.ATLAS_URI || "";

// Yhdistä MongoDB:hen Mongoosea käyttäen
async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5s aikakatkaisu
    });
    console.log("MongoDB-yhteys onnistui!");
  } catch (err) {
    console.error("MongoDB-yhteysvirhe:", err);
    process.exit(1); // Sulkee sovelluksen, jos yhteys epäonnistuu
  }
}

// Kutsutaan connectDB, jotta yhteys muodostetaan heti kun moduuli ladataan
connectDB();

// Luo yhteydet eri tietokantoihin
const db = mongoose.connection.useDb("employees");
const dbTest = mongoose.connection.useDb("sample_guides");
const Userdb = mongoose.connection.useDb("users");


//TESTI

//const testiKayt = new RegisterModel({
//  name: "Riitta",
//  email: "testi@joku.com",
//  password: "joku80"
//})
//
//await testiKayt.save();





// Exportataan tietokannat ja mongoose-yhteys
export { db, dbTest, Userdb, mongoose };

