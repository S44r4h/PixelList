import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import testRoutes from "./routes/dbTest.js"; // Tuo uusi testireititin
import userRoutes from './routes/userRoutes.js'
import loginRoutes from './routes/loginRoutes.js';


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records)
app.use("/test", testRoutes);
app.use('/user', userRoutes); // esim. userRoutes-reitit alkavat polusta /user.
app.use('/signinuser', loginRoutes)

app.listen(PORT, () => {
    console.log(`server is listening ${PORT}`)
})