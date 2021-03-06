import db from "../db.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

async function login(req, res) {
    const userAuth = req.body;
    try {
        const userData = await db.collection("Users").findOne({email: userAuth.email});

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

async function register(req,res){
    const userAuth=req.body;
    try{
        const usedEmail = await db.collection("Users").findOne({email: userAuth.email});
        if(usedEmail) return res.status(409).send("Já possuimos um usuário com esse e-mail.");

        const usedCpf = await db.collection("Users").findOne({cpf: userAuth.cpf});
        if(usedCpf) return res.status(409).send("Já possuimos um usuário com esse cpf")

        const hash = bcrypt.hashSync(userAuth.senha, 5)
        delete userAuth.senha
        const user = {...userAuth, hash}
        

        await db.collection("UserShoppingCart").insertOne({cpf: userAuth.cpf, shoppingCart: [], total:"0,00"})

        await db.collection("Users").insertOne(user)
        return res.sendStatus(201)

    } catch(e){
        res.sendStatus(500);
    }
}

export {login , register}