import express from "express";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import { db } from "./db/connection.js"; /* HUOM ÄLÄ POISTA yhdistää mongodb! */
import userRoutes from "./routes/userRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import userGameRoutes from "./routes/userGameRoutes.js";
import UserManagement from "./routes/userManagementRoutes.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

//import profileRoutes from './routes/profileRoutes.js'

const PORT = process.env.PORT || 5050;
const app = express();
app.use(express.json());
app.use(cookieParser());

// data sanitization
app.use(mongoSanitize());

// data sanitization against xss injection
app.use(xss());

app.use(
  cors({
    origin: "http://localhost:5173", // Reactin URL
    credentials: true, // Mahdollistaa evästeiden käytön
  })
);

/* TÄÄ POIS? */
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/user", userRoutes); // esim. userRoutes-reitit alkavat polusta /user.
app.use("/signinuser", loginRoutes);
app.use("/editgames", gameRoutes);
app.use("/usergames", userGameRoutes);
app.use("/usermanagement", UserManagement);
//vain kirjautuneille käyttäjille
//app.use('/profile', profileRoutes);

app.listen(PORT, () => {
  console.log(`server is listening ${PORT}`);
});
