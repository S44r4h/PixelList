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

/* CHANGE ROLE */
router.patch("/:id", async (req, res) => {
  try {
    const { token } = req.cookies;
    const updateCriteria = { _id: new ObjectId(req.params.id) };
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decoded = jwt.verify(token, sectret);
    if (decoded.role === "admin") {
      /* SELVITÄ ONKO KÄYTTÄJÄ ADMIN / USER */

      const user = await RegisterModel.findOne({ _id: updateCriteria });

      console.log(user.role);

      if (user.role === "admin") {
        const result = await RegisterModel.findOneAndUpdate(
          { _id: updateCriteria },
          { $set: { role: "user" } },
          { new: true }
        );
        console.log(`käyttjä on: ${updateCriteria.role}`);
        return res.status(201).json({
          _id: result._id,
          name: result.name,
          email: result.email,
          role: result.role,
        });
      } else if (user.role === "user") {
        const result = await RegisterModel.findOneAndUpdate(
          { _id: updateCriteria },
          { $set: { role: "admin" } },
          { new: true }
        );
        console.log(`käyttjä on: ${updateCriteria.role}`);
        return res.status(201).json({
          _id: result._id,
          name: result.name,
          email: result.email,
          role: result.role,
        });
      }
    } else {
      return res.status(401).json({ message: "Not admin" });
    }
  } catch (err) {
    console.error("Wishlist error:", err.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
