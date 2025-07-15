import express from "express";
import jwt from "jsonwebtoken";
import RegisterModel from "../model/Register.js";
import UserGameModel from "../model/UserGames.js";

const router = express.Router();
const sectret = "kjs343kn3k36p5d0a1334hgw1"; /* TÄMÄ .env! */

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

/* READ */

/**
 * @swagger
 * /usermanagement:
 *   get:
 *     summary: Get all users except the logged-in user
 *     description: Returns a list of all registered users except the currently authenticated user.
 *     tags:
 *       - Admin User Management
 *     responses:
 *       200:
 *         description: A list of users excluding the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authenticated or invalid/expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *     security:
 *       - cookieAuth: []
 */

router.get("/", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, sectret);
    const results = await RegisterModel.find({
      _id: { $ne: decoded.id },
    }); /* filters logged user from list $ne - not equal */
    return res.status(200).send(results);
  } catch (err) {
    console.error("Error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

/* DELETE USER */

/**
 * @swagger
 * /usermanagement/{id}:
 *   delete:
 *     summary: Delete a user by ID (admin only)
 *     description: Deletes a user by their ID and also removes their associated game lists. Requires admin role.
 *     tags:
 *       - Admin User Management
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID to delete
 *     responses:
 *       201:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Deleted user ID
 *                   example: 60b8d295f1d3c81234567890
 *       401:
 *         description: Not authenticated or not admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not authenticated / Not admin
 *       500:
 *         description: Server error
 *     security:
 *       - cookieAuth: []
 */

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
      await UserGameModel.deleteOne({
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

/**
 * @swagger
 * /usermanagment/{id}:
 *   patch:
 *     summary: Toggle user role between "admin" and "user" (admin only)
 *     description: Allows an admin to change a user's role from "admin" to "user" or vice versa.
 *     tags:
 *       - Admin User Management
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose role will be toggled
 *     responses:
 *       201:
 *         description: User role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60b8d295f1d3c81234567890
 *                 name:
 *                   type: string
 *                   example: JohnDoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 role:
 *                   type: string
 *                   description: Updated role, either "admin" or "user"
 *                   example: admin
 *       401:
 *         description: Not authenticated or not admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not authenticated / Not admin
 *       500:
 *         description: Server error
 *     security:
 *       - cookieAuth: []
 */

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
