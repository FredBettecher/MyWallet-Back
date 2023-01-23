import express from "express";
import { signUp } from "../controllers/signUp.js";
import db from "../config/database.js";

const signUpRoute = express.Router();

signUpRoute.post("/cadastro", signUp);

signUpRoute.get("/cadastro", (req, res) => db.collection("users").find().toArray().then(usersList => {
    return res.send(usersList);
}));

export default signUpRoute;