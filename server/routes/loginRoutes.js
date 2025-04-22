 import express from "express";
 import bcrypt from "bcrypt"
 //import session from 'express-session'
 import jwt from 'jsonwebtoken';
 import cookieParser from 'cookie-parser' // purkaa cookie-headerin helposti luettavaan muotoon
 import RegisterModel from "../model/Register.js"

 const router = express.Router();
 router.use(cookieParser())





  /* create session */

//router.use(session({
//    secret: 'key that will sign cookie', // HUOM PIILOTA TÄÄ!
//    resave: false,
//    saveUninitialized: false // laita false myöh.
//}))

// sectret key for auth

const sectret = 'kjs343kn3k36p5d0a1334hgw1'

 
 /* Sign In */

 router.post("/", async (req, res) => {
    const {email, password} = req.body;
    
    try {
   
    const user = await RegisterModel.findOne({email: email})
    
      if(user) {
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(passwordMatch) {
           console.log(`welcome ${user.name}`)
           jwt.sign({id: user.id, name: user.name}, sectret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok')
           })
          //res.json({ id: user.id, name: user.name }) // VAIHDA SUCCSESS
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


  router.get('/profile', (req, res) => {
    const {token} =  req.cookies
    jwt.verify(token, sectret, {}, (err, info) =>{ //tarkistaa annetun token(user.name & id) ja sectret
      if (err) throw err;
      res.json(info)
    }) 
  })





  //router.get("/dashboard", async (req, res) => {
  //  if (req.session.userId) {
  //    const user = await RegisterModel.findOne({ _id: req.session.userId})
  //    //res.status(200).json({ message: `Welcome`});
  //    res.send(user).status(200);
  //  } else {
  //    //res.status(401).json({ message: "Unauthorized, please login" });
  //    res.send('EERRROR');
  //  }
  //  
  //});
//
  //
 // router.get("/logout", async (req, res) => {
 //   req.session.destroy();
 //   user
 //   res.status(200).json({ message: `you have logout`});
 // });


  export default router;