import express from "express";
const router = express.Router();

router.get("/dashboard", (req, res) => {
    //if (req.session.userId) {
    //  res.status(200).json({ message: `Welcome` });
    //} else {
    //  res.status(401).json({ message: "Unauthorized, please login" });
    //}
    res.send('testi')
  });

  export default router;