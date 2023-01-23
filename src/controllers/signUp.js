import db from "../config/database.js";
import bcrypt from "bcrypt";
import { signUpSchema } from "../schemas/signUpSchema.js";

export const signUp = async (req, res) => {
    const userSignUp = req.body;
    const userValidade = signUpSchema.validate(userSignUp);

    try {
        const emailExists = await db.collection("users").findOne( { email: userSignUp.email } );

        if(emailExists) {
            return res.status(409).send("Este email já está sendo usado.");
        }
    
        if(userValidade.error) {
            return res.status(422).send(userValidade.error.details);
        }

        const cryptoPassword = await bcrypt.hash(userSignUp.password, 10);

        await db.collection("users").insertOne({
            name: userSignUp.name,
            email: userSignUp.email,
            password: cryptoPassword
        });

        res.status(201).send("Usuário cadastrado com sucesso!");

    } catch(err) {
        res.status(500).send(err.message);
    }

    console.log(userSignUp)
}

export default signUp;