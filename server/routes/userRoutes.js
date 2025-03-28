import express from "express";
import { Userdb } from "../db/connection.js"; // Tuodaan testitietokanta
const router = express.Router();

// Lisää testidataa tietokantaan, kun menee /test
router.get("/", async (req, res) => {
  try {
    let collection = await Userdb.collection("AAA"); // Luo / käytä testCollection-kokoelmaa
    let testData = { message: "Tämä on testidata", timestamp: new Date() };
    
    let result = await collection.insertOne(testData);
    res.status(201).send({ message: "Testidata lisätty!", result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Virhe lisättäessä testidataa");
  }
});


router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    let collection = await Userdb.collection("accounts");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});




export default router;
