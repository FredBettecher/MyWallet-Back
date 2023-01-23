import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signUpRoute from "./routes/signUpRoute.js";
import loginRoute from "./routes/loginRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(signUpRoute);
app.use(loginRoute);

app.listen(process.env.PORT, () => console.log("Listening on port " + process.env.PORT));