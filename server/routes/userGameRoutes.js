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
//READ

router.get("/", async (req, res) => {
  let results = await UserGameModel.find({});
  res.send(results).status(200);
});

//CREATING wishList with userId
/* TÄHÄN CATCH ERROR HALLINTA -> PAREMPI KOODI! */
//
//router.post("/:id", async (req, res) => {
//  try {
//    let gameID = { _id: new ObjectId(req.params.id) };
//    const { token } = req.cookies;
//    if (!token) {
//      return res.status(401).json({ message: "Not authenticated" });
//    }
//
//    const decoded = jwt.verify(token, sectret);
//    let result = await UserGameModel.findOneAndUpdate(
//      { user: decoded.id },
//      {
//        $push: { wishList: gameID },
//      },
//      {
//        new: true,
//      }
//    );
//    if (!result) {
//      UserGameModel.create({
//        user: decoded.id,
//        wishList: [gameID],
//      });
//    }
//  } catch (error) {
//    console.error("Wishlist error:", error.message);
//    res.status(500).json({ message: "Something went wrong" });
//  }
//});

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
    console.log(`${result.wishList.includes(gameID._id)}`);
    await result.save();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Wishlist error:", error.message);

    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
