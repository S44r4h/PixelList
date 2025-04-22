

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








// Exportataan tietokannat ja mongoose-yhteys
export { db, dbTest, Userdb, mongoose };

