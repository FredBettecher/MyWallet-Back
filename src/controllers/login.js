import db from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { loginSchema } from "../schemas/loginSchema.js"

export const login = async (req, res) => {
    const userLogin = req.body;
    const token = uuid();
    const loginValidate = loginSchema.validate(userLogin);

    try {
        const user = await db.collection("users").findOne( { email: userLogin.email } );
        const emailExists = await db.collection("users").findOne( { email: userLogin.email } );
        const validatePassword = await bcrypt.compare(userLogin.password, user.password);

        if(!emailExists || !validatePassword) {
            return res.status(404).send("Email ou senha inválidos.")
        }

        db.collection("session").insertOne({
            token,
            name: user.name
        });

        return res.status(201).send("Usuário logado com sucesso!");

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}