 import express from "express";
 import bcrypt from "bcrypt"
 import session from 'express-session'
 import RegisterModel from "../model/Register.js"

 const router = express.Router();
 




  /* create session */

router.use(session({
    secret: 'key that will sign cookie', // HUOM PIILOTA TÄÄ!
    resave: false,
    saveUninitialized: true // laita false myöh.
}))

 
 /* Sign In */

 router.post("/", async (req, res) => {
    const {email, password} = req.body;
    
    try {
   
    const user = await RegisterModel.findOne({email: email})
    
      if(user) {
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(passwordMatch) {
           console.log(`welcome ${user.name}`)
           console.log(req.session)
           req.session.userId = user.id;
           console.log(user.id)
          res.json("Success")
        } else {
          res.status(401).json("this password is incorrect")
        }
      } else {
          res.status(401).json("No record existed")
      }
    
} catch (error) {
    res.status(500).json({error: error.message})
}
  })






  //router.get("/dashboard", (req, res) => {
  //  if (req.session.userId) {
  //    res.status(200).json({ message: `Welcome` });
  //  } else {
  //    res.status(401).json({ message: "Unauthorized, please login" });
  //  }
  //});


  export default router;