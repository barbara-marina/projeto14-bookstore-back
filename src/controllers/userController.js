import { ObjectId } from "mongodb";
import db from "./../db.js";

export async function logout (req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();
    try {
        await db.collection("Sessions").deleteOne({token: token});
        res.sendStatus(200);
    } catch (e) {
        return res.sendStatus(500);
    }
}

export async function addToShoppingCart(req, res) {
    const { user } = res.locals;
    const { bookId } = req.body;
    
    try {
        const book = await db.collection("Books").findOne({_id: new ObjectId(bookId)});
        if (!book) return res.sendStatus(401);

        await db.collection("UserShoppingCart").updateOne(
            {cpf: user.cpf},
            {$push: {shoppingCart: book}}
        );

        res.status(201).send("Livro adicionado ao seu carrinho.");
    } catch (e) {
        return res.sendStatus(500);
    }
}

export async function getShoppingCart(_req, res) {
    const { user } = res.locals;

    try {
        const shoppingCart = await db.collection("UserShoppingCart").findOne({cpf: user.cpf});
        if (!shoppingCart) return res.sendStatus(401);

        res.send(shoppingCart);
    } catch (e) {
        return res,sendStatus(500);
    }
}