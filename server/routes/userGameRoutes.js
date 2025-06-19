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

/* WISHLIST */
router.post("/:id", async (req, res) => {
  try {
    let gameID = { _id: new ObjectId(req.params.id) };
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, sectret);
    let result = await UserGameModel.findOne({ user: decoded.id });
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

router.post("/addplayed/:id", async (req, res) => {
  try {
    let gameID = { _id: new ObjectId(req.params.id) };
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, sectret);
    let result = await UserGameModel.findOne({ user: decoded.id });
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
router.delete("/:list/:id", async (req, res) => {
  try {
    const deleteCriteria = { _id: new ObjectId(req.params.id) };
    const list = req.params.list;
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decodedUser = jwt.verify(token, sectret);
    let result = await UserGameModel.findOne({ user: decodedUser.id });
    console.log(result[list]);
    if (result[list].includes(deleteCriteria._id)) {
      const removedId = deleteCriteria._id;
      result[list] = result[list].filter(
        (id) => id.toString() !== deleteCriteria._id.toString()
      );
      await result.save();
      return res.status(201).json(removedId);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

/* SWITCH LISTS */

router.patch("/:list/:id", async (req, res) => {
  try {
    const updateCriteria = { _id: new ObjectId(req.params.id) };
    const list = req.params.list;
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decodedUser = jwt.verify(token, sectret);
    let result = await UserGameModel.findOne({ user: decodedUser.id });

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
