import express from "express";
import bcrypt from "bcrypt"
import { Userdb } from "../db/connection.js"; // Tuodaan testitietokanta
import RegisterModel from "../model/Register.js"
const router = express.Router();



/* Register */
router.post("/", async (req, res, next) => {
  const {name, email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // hashaa salasanan 2^10 =1024. mitä isompi, sitä kauemmin kestää ajaa funktio -> 12 & 14 super turvallinen
  //   //12 tai 14 pitäisi olla superturvalline, 10 OK
  RegisterModel.findOne({$or: [{ email: email }, { name: name }]})
  .then(user => {
    if(user) {
      if(user.email === email) {
        res.status(400).json({ err: "That email is already in use!" })
      }
      if(user.name === name) {
        res.status(400).json({ err: "That name is already in use!" })
      }
    } else {
      RegisterModel.create({name: name, email: email, password: hashedPassword})
      .then(result => res.json("Account created"))
      .catch(err => res.json(err))
    }
  }).catch(err => res.json(err))


 

//
//
 // try {
 //   let newDocument = {
 //     name: req.body.name,
 //     email: req.body.email,
 //     password: req.body.password,
 //   };
 //   newDocument.password = await bcrypt.hash(newDocument.password, 10); // hashaa salasanan 2^10 =1024. mitä isompi, sitä kauemmin kestää ajaa funktio -> 12 & 14 super turvallinen
 //   //12 tai 14 pitäisi olla superturvalline, 10 OK
 //   let result = await collection.insertOne(newDocument);
 //   res.send(result).status(204);
 // } catch (err) {
 //   console.error(err);
 //   res.status(500).send("Error adding record");
 // }
});






// TESTI
router.get('/lista', async (req, res) => {
  let collection = await Userdb.collection("accounts");
  let results = await collection.find().toArray();
  res.send(results).status(200);
})

router.get('/lista/:password', async (req, res) => { 
  
 try {
  let collection = await Userdb.collection("accounts");  // HUOM path pitää olla : pisteet
  let query = { password: (req.params.password) };
  let result = await collection.findOne(query);
  
  if(!result) {
    res.send('cant find')
  } else {
    res.send(result).status(200);
  }
 } catch(err) {
  console.error(err);
  res.status(500).send("Error finding user");
 }
  
})






export default router;
