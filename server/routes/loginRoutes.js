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

/**
 * @swagger
 * /siginuser/signin:
 *   post:
 *     summary: User sign-in
 *     description: Authenticates user with email and password, returns user info and sets auth token in an httpOnly cookie.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: Successful login, sets token cookie and returns user info.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: User ID
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: This password is incorrect
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

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
  }
});

/* GET USER */

/**
 * @openapi
 * /signinuser/profile:
 *   get:
 *     summary: Get logged-in user's profile info from token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully decoded token, user info returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: No token provided
 *       403:
 *         description: Invalid token
 */

router.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, sectret, {}, (err, user) => {
      //tarkistaa annetun token(user.name & id) ja sectret
      if (err) return res.status(403).json({ message: "Invalid token" });
      return res.json(user);
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});

/* LOG_OUT */

/**
 * @openapi
 * /signinuser/logout:
 *   post:
 *     summary: Logs out the current user by clearing the token cookie
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 */

router.post("/logout", async (req, res) => {
  return res.cookie("token", "").json("ok");
});

export default router;
