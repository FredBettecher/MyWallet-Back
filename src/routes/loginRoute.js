import express from "express";
import { login } from "../controllers/login.js";
import db from "../config/database.js";

const loginRoute = express.Router();

loginRoute.post("/", login);

loginRoute.get("/", (req, res) => db.collection("session").find().toArray().then(sessionList => {
    return res.send(sessionList);
}));

export default loginRoute;