import express from "express";
import gamesModel from "../model/Game.js"


const router = express.Router();


//CREATE

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      title: req.body.title,
      platform: req.body.platform,
      genre: req.body.genre
    };
   gamesModel.create({title: newDocument.title, platform: newDocument.platform, genre: newDocument.genre})
         .then(result => res.json("new game created"))
         .catch(err => res.json(err))
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});


// READ

router.get("/", async (req, res) => {
  let results = await gamesModel.find({});
  res.send(results).status(200);
});


export default router;
