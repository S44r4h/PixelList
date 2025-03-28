import express from "express";
import { dbTest } from "../db/connection.js"; // Tuodaan testitietokant
const router = express.Router();

// Lisää testidataa tietokantaan, kun menee /test
router.get("/", async (req, res) => {
  try {
    let collection = await dbTest.collection("testCollection"); // Luo / käytä testCollection-kokoelmaa
    let testData = { message: "Tämä on testidata", timestamp: new Date() };
    
    let result = await collection.insertOne(testData);
    res.status(201).send({ message: "Testidata lisätty!", result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Virhe lisättäessä testidataa");
  }
});

export default router;
