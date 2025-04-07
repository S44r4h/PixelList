 import express from "express";
 import bcrypt from "bcrypt"

 import RegisterModel from "../model/Register.js"
 const router = express.Router();
 
 
 /* Sign In */

 router.post("/", async (req, res) => {
    const {email, password} = req.body;
    
    try {
   
    const user = await RegisterModel.findOne({email: email})
    
      if(user) {
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(passwordMatch) {
           console.log(`welcome ${user.name}`)
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


  export default router;