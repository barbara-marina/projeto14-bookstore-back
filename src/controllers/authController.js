import db from "../db.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

export default async function login(req, res) {
    const userAuth = req.body;
    try {
        const userData = await db.collection("Users").findOne({email: userAuth.email});
        console.log(userData);
        if (!userData) return res.status(404).send("Usuário não existe.");

        if (userData && bcrypt.compareSync(userAuth.hash, userData.hash)) {
            const token = uuid();
            await db.collection("Sessions").insertOne({token, cpf: userData.cpf});
            return res.send(token);
        }
        res.status(401).send("Não autorizado! Senha está incorreta.");
    } catch(e) {
        res.sendStatus(500);
    }
}