import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import testRoutes from "./routes/dbTest.js"; // Tuo uusi testireititin
import userRoutes from './routes/userRoutes.js'
import loginRoutes from './routes/loginRoutes.js';
//import profileRoutes from './routes/profileRoutes.js'


const PORT = process.env.PORT || 5050;
const app = express();


app.use(cors({
    origin: "http://localhost:5173", // Reactin URL
    credentials: true               // Mahdollistaa evästeiden käytön
  }));







app.use(express.json());
app.use("/record", records)
app.use("/test", testRoutes);
app.use('/user', userRoutes); // esim. userRoutes-reitit alkavat polusta /user.
app.use('/signinuser', loginRoutes)


//vain kirjautuneille käyttäjille
//app.use('/profile', profileRoutes);




app.listen(PORT, () => {
    console.log(`server is listening ${PORT}`)
})