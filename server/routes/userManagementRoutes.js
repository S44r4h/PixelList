import express from "express";
import jwt from "jsonwebtoken";
import RegisterModel from "../model/Register.js";
import UserGameModel from "../model/UserGames.js";

const router = express.Router();
const sectret = "kjs343kn3k36p5d0a1334hgw1"; /* TÄMÄ .env! */

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

/* READ */
router.get("/", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, sectret);

    let results = await RegisterModel.find({});
    return res.status(200).send(results);
  } catch (err) {
    console.error("Error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

/* DELETE USER */

router.delete("/:id", async (req, res) => {
  try {
    const { token } = req.cookies;
    const deleteCriteria = { _id: new ObjectId(req.params.id) };
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decoded = jwt.verify(token, sectret);
    console.log(decoded.role);
    if (decoded.role === "admin") {
      const result = await RegisterModel.findOneAndDelete(deleteCriteria);
      const deleteFromuserGames = await UserGameModel.deleteOne({
        user: deleteCriteria,
      });
      return res.status(201).json({ _id: result._id });
    } else {
      return res.status(401).json({ message: "Not admin" });
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
