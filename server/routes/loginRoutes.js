import express from "express";
import bcrypt from "bcrypt";
//import session from 'express-session'
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"; // purkaa cookie-headerin helposti luettavaan muotoon
import RegisterModel from "../model/Register.js";

const router = express.Router();
router.use(cookieParser());

// sectret key for auth

const sectret = "kjs343kn3k36p5d0a1334hgw1"; // LAITA TÄMÄ .env!

/* Sign In */

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await RegisterModel.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        console.log(`welcome ${user.name} ja role on ${user.role}`);
        jwt.sign(
          { id: user.id, name: user.name, role: user.role } /* Testi */,
          sectret,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 24 * 60 * 60 * 1000, // 1 päivä
              })
              .json(user);
          }
        );
      } else {
        res.status(401).json({ message: "This password is incorrect" });
      }
    } else {
      res.status(401).json({ message: "This email is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("joku error");
  }
});

router.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, sectret, {}, (err, user) => {
      //tarkistaa annetun token(user.name & id) ja sectret
      if (err) return res.status(401).json({ message: "Invalid token" });
      return res.json(user);
    });
  } else {
    res.json(null);
  }
});

router.post("/logout", async (req, res) => {
  res.cookie("token", "").json("ok");
});

export default router;
