import express from "express";
import gamesModel from "../model/Game.js"


const router = express.Router();

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";


//CREATE

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      title: req.body.title,
      platform: req.body.platform,
      genre: req.body.genre
    };
   const result = await gamesModel.create({title: newDocument.title, platform: newDocument.platform, genre: newDocument.genre})
   res.status(201).json(result);
   console.log(result._id)
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


 //This section will help you get a single record by id
  router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let result = await gamesModel.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.status(201).json(result);
});




// delete game
router.delete("/:id", async (req, res) => {
  try {
    const deleteCriteria = { _id: new ObjectId(req.params.id) };
    let result = await gamesModel.findOneAndDelete(deleteCriteria);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});



// Edit game
router.patch("/:id", async (req, res) => {
  try {
    const updateCriteria  = { _id: new ObjectId(req.params.id) };
    const updates = {
        title: req.body.title,
        platform: req.body.platform,
        genre: req.body.genre
    };

    let result = await gamesModel.findOneAndUpdate(updateCriteria, updates, {new: true});
    console.log(result)
    res.status(201).json(result);
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});





export default router;
