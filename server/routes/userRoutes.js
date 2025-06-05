import express from "express";
import bcrypt from "bcrypt";
import RegisterModel from "../model/Register.js";
const router = express.Router();

/* Register */
router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // hashaa salasanan 2^10 =1024. mitä isompi, sitä kauemmin kestää ajaa funktio -> 12 & 14 super turvallinen
  //   //12 tai 14 pitäisi olla superturvalline, 10 OK
  RegisterModel.findOne({ $or: [{ email: email }, { name: name }] })
    .then((user) => {
      if (user) {
        if (user.email === email) {
          res.status(400).json({ err: "That email is already in use!" });
        }
        if (user.name === name) {
          res.status(400).json({ err: "That name is already in use!" });
        }
      } else {
        RegisterModel.create({
          name: name,
          email: email,
          password: hashedPassword,
          role: "user",
        })
          .then((result) => res.json("Account created"))
          .catch((err) => res.json(err));
      }
    })
    .catch((err) => res.json(err));
});

export default router;
