import express from "express";
import UserGameModel from "../model/UserGames.js";
import gamesModel from "../model/Game.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"; // purkaa cookie-headerin helposti luettavaan muotoon
import mongoose from "mongoose";
const router = express.Router();
router.use(cookieParser());

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";
const sectret = "kjs343kn3k36p5d0a1334hgw1"; // LAITA TÄMÄ .env!

//READ USER GAMES

/**
 * @openapi
 * /usergames:
 *   get:
 *     summary: Get user's wishList and playedList
 *     tags: [UserGames]
 *     responses:
 *       200:
 *         description: Lists returned successfully
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Server error
 */

router.get("/", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const decoded = jwt.verify(token, sectret);

  let games = await UserGameModel.findOne({ user: decoded.id })
    .populate(["wishList", "playedList"])
    .exec();

  /* IF user dont have lists adds them */
  if (!games) {
    games = await UserGameModel.create({
      user: decoded.id,
      wishList: [],
      playedList: [],
    });
  }

  return res
    .status(200)
    .send({ wishList: games.wishList, playedList: games.playedList });
});

/* ADD TO WISHLIST */

/**
 * @openapi
 * /addwishlist/{id}:
 *   post:
 *     summary: Add a game to the user's wishlist
 *     tags: [UserGames]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game to add to the wishlist
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User token is sent via cookies (req.cookies.token)
 *       required: true
 *     responses:
 *       201:
 *         description: Game added to wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserGameModel'
 *       401:
 *         description: User is not authenticated (no token)
 *       500:
 *         description: Game already in wishlist or other server error
 *
 */

router.post("/addwishlist/:id", async (req, res) => {
  try {
    const gameID = { _id: new ObjectId(req.params.id) };
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, sectret);
    const result = await UserGameModel.findOne({ user: decoded.id });
    if (!result) {
      const addedGame = await UserGameModel.create({
        user: decoded.id,
        wishList: [gameID],
      });
      return res.status(201).json(addedGame);
    }
    if (result.wishList.includes(gameID._id)) {
      return res.status(500).json({ message: "game already Wishlist in list" });
    }

    result.wishList.push(gameID);
    await result.save();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Wishlist error:", error.message);

    return res.status(500).json({ message: "Something went wrong" });
  }
});

/* ADD PLAYED-List */

/**
 * @openapi
 * /addplayed/{id}:
 *   post:
 *     summary: Add a game to the user's played list
 *     tags: [UserGames]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game to add to the played list
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User token is sent via cookies (req.cookies.token)
 *       required: true
 *     responses:
 *       201:
 *         description: Game added to played list successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserGameModel'
 *       401:
 *         description: User is not authenticated (no token)
 *       500:
 *         description: Game already in played list or other server error
 *
 */

router.post("/addplayed/:id", async (req, res) => {
  try {
    const gameID = { _id: new ObjectId(req.params.id) };
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, sectret);
    const result = await UserGameModel.findOne({ user: decoded.id });
    if (!result) {
      const addedGame = await UserGameModel.create({
        user: decoded.id,
        playedList: [gameID],
      });
      return res.status(201).json(addedGame);
    }
    if (result.playedList.includes(gameID._id)) {
      return res.status(500).json({ message: "game already in played list" });
    }

    result.playedList.push(gameID);
    await result.save();
    return res.status(200).json(result);
  } catch (error) {
    console.error("PlayedList error:", error.message);

    return res.status(500).json({ message: "Something went wrong" });
  }
});

/* DELETE GAME */

/**
 * @swagger
 * /usergames/{list}/{id}:
 *   delete:
 *     summary: Delete a game from a user's list (wishList or playedList)
 *     description: Removes a specific game from the user's selected list (either wishList or playedList). Requires authentication via cookie token.
 *     tags:
 *       - UserGames
 *     parameters:
 *       - in: path
 *         name: list
 *         required: true
 *         description: The list from which to delete the game (e.g. "wishList" or "playedList")
 *         schema:
 *           type: string
 *           enum: [wishList, playedList]
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the game to remove
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Game successfully removed from the list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 removedId:
 *                   type: string
 *                   example: 60f7ae9f23e01e34a8f49b11
 *       401:
 *         description: Not authenticated - missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Game not found in specified list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.delete("/:list/:id", async (req, res) => {
  try {
    const deleteCriteria = { _id: new ObjectId(req.params.id) };
    const list = req.params.list;
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decodedUser = jwt.verify(token, sectret);
    const result = await UserGameModel.findOne({ user: decodedUser.id });
    console.log(result[list]);
    if (result[list].includes(deleteCriteria._id)) {
      const removedId = deleteCriteria._id;
      result[list] = result[list].filter(
        (id) => id.toString() !== deleteCriteria._id.toString()
      );
      await result.save();
      return res.status(201).json(removedId);
    } else {
      return res.status(404).send("game not found in list");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

/* SWITCH LISTS */

/**
 * @swagger
 * /usergames/{list}/{id}:
 *   patch:
 *     summary: Move a game from one list to another (wishList <-> playedList)
 *     description: |
 *       Moves a game between the user's `wishList` and `playedList`.
 *       If the game is already in the target list, it returns a conflict (409).
 *       Requires authentication via cookie token.
 *     tags:
 *       - UserGames
 *     parameters:
 *       - in: path
 *         name: list
 *         required: true
 *         description: The current list the game is in (either `wishList` or `playedList`)
 *         schema:
 *           type: string
 *           enum: [wishList, playedList]
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the game to move
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Game successfully moved to the other list
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 60f7ae9f23e01e34a8f49b11
 *       401:
 *         description: Not authenticated - missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Game already exists in the target list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.patch("/:list/:id", async (req, res) => {
  try {
    const updateCriteria = { _id: new ObjectId(req.params.id) };
    const list = req.params.list;
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decodedUser = jwt.verify(token, sectret);
    const result = await UserGameModel.findOne({ user: decodedUser.id });

    if (list === "wishList") {
      if (result["playedList"].includes(updateCriteria._id)) {
        console.log("Peli on jo playedList");
        return res.status(409).json(result);
      }

      result[list] = result[list].filter(
        (id) => id.toString() !== updateCriteria._id.toString()
      );
      result.playedList.push(updateCriteria._id);
      await result.save();
      console.log(
        `delete from ${list} and added ${updateCriteria._id} to playedList`
      );
      return res.status(200).json(updateCriteria._id);
    }

    if (list === "playedList") {
      if (result["wishList"].includes(updateCriteria._id)) {
        console.log("Peli on jo wishList");
        return res.status(409).json(result);
      }
      result[list] = result[list].filter(
        (id) => id.toString() !== updateCriteria._id.toString()
      );
      result.wishList.push(updateCriteria._id);
      await result.save();
      console.log(
        `delete from ${list} and added ${updateCriteria._id} to wishLIST`
      );
      return res.status(200).json(updateCriteria._id);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
