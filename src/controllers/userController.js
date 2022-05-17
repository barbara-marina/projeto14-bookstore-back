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

        const userShoppingCart = await db.collection("UserShoppingCart").findOne({cpf: user.cpf});

        const total = (parseFloat(userShoppingCart?.total.replace(",",".")) + parseFloat((book.preco).replace(",","."))).toString();

        await db.collection("UserShoppingCart").updateOne(
            {cpf: user.cpf},
            {$push: {shoppingCart: book}, $set: {total: (total).replace(".", ",")}}
        );

        res.status(201).send("Livro adicionado ao seu carrinho.");
    } catch (e) {
        return res.sendStatus(500);
    }
}

export async function deleteBook(req, res) {
    const { user } = res.locals;
    const { bookId } = req.params;
    
    try {
        const userShoppingCart = await db.collection("UserShoppingCart").findOne({cpf: user.cpf});
        if (!userShoppingCart) return res.sendStatus(401);

        const cart = userShoppingCart.shoppingCart;

        const indexBookToDelete = cart?.findIndex(book => book._id.equals(bookId));
        cart.splice(indexBookToDelete, 1);
    
        let total = "0";
        cart?.forEach( book => {
            total = (parseFloat(book.preco.replace(",", ".")) + parseFloat(total.replace(",", "."))).toString();
        });
        await db.collection("UserShoppingCart").updateOne(
            {cpf: user.cpf},
            {$set: {shoppingCart: cart}}
        );
        await db.collection("UserShoppingCart").updateOne(
            {cpf: user.cpf},
            {$set: {total: total.replace(".",",")}}
        );

        res.status(201).send("Livro retirado ao seu carrinho.");
    } catch (e) {
        console.log(e);
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

export async function postOrder(req, res) {
    const order = req.body;

    try {
        await db.collection("Orders").insertOne(order);
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
} 