import express from "express";
import gamesModel from "../model/Game.js";
import UserGameModel from "../model/UserGames.js";
const router = express.Router();
import mongoose from "mongoose";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

//CREATE

/**
 * @openapi
 * /editgames:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, platform, genre]
 *             properties:
 *               title:
 *                 type: string
 *               platform:
 *                 type: string
 *               genre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game created successfully
 *       500:
 *         description: Server error
 */

router.post("/", async (req, res) => {
  try {
    const newDocument = {
      title: req.body.title,
      platform: req.body.platform,
      genre: req.body.genre,
    };
    const result = await gamesModel.create({
      title: newDocument.title,
      platform: newDocument.platform,
      genre: newDocument.genre,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// READ

/**
 * @openapi
 * /editgames:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: List of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */

router.get("/", async (req, res) => {
  const results = await gamesModel.find({});
  res.send(results).status(200);
});

/* READ SINGLE GAME */

/**
 * @openapi
 * /editgames/{id}:
 *   get:
 *     summary: Get a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game to retrieve
 *     responses:
 *       200:
 *         description: Game found and returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 platform:
 *                   type: array
 *                   items:
 *                     type: string
 *                 genre:
 *                   type: object
 *                   properties:
 *                     main:
 *                       type: string
 *
 *       404:
 *         description: Game not found
 *       500:
 *         description: Server error
 */

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid game ID format" });
  }

  const query = { _id: new ObjectId(req.params.id) };
  const result = await gamesModel.findOne(query);
  if (!result) {
    res.status(404).send("Not found");
  } else {
    res.status(200).json(result);
  }
});

/* DELETE GAME */

/**
 * @openapi
 * /editgames/{id}:
 *   delete:
 *     summary: Delete a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game to delete
 *     responses:
 *       200:
 *         description: Game successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 platform:
 *                   type: string
 *                 genre:
 *                   type: string
 *       500:
 *         description: Server error while deleting game
 */

router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid game ID format" });
  }

  try {
    const deleteCriteria = new ObjectId(req.params.id);
    const result = await gamesModel.findOneAndDelete(deleteCriteria);
    /* THIS DELETES GAME FROM ALL USER LIST */
    await UserGameModel.updateMany(
      {},
      { $pull: { wishList: deleteCriteria, playedList: deleteCriteria } }
    );
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

/* EDIT GAME */

/**
 * @openapi
 * /editgames/{id}:
 *   patch:
 *     summary: Update a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               platform:
 *                 type: string
 *               genre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Game updated successfully
 *       404:
 *         description: Game not found
 *       500:
 *         description: Error updating game
 */

router.patch("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid game ID format" });
  }

  try {
    const updateCriteria = { _id: new ObjectId(req.params.id) };
    const updates = {
      title: req.body.title,
      platform: req.body.platform,
      genre: req.body.genre,
    };

    const result = await gamesModel.findOneAndUpdate(updateCriteria, updates, {
      new: true,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

export default router;
