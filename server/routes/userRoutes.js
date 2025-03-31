import express from "express";
import bcrypt from "bcrypt"
import { Userdb } from "../db/connection.js"; // Tuodaan testitietokanta

const router = express.Router();




router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    newDocument.password = await bcrypt.hash(newDocument.password, 10); // hashaa salasanan 2^10 =1024. mitä isompi, sitä kauemmin kestää ajaa funktio -> 12 & 14 super turvallinen
    //12 tai 14 pitäisi olla superturvalline, 10 OK
    let collection = await Userdb.collection("accounts");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});




export default router;
