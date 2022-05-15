import db from "./../db.js";

export default async function validateToken(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();
    
    if (!token) return res.status(401).send("Token não recebido.");
    
    try {
        const sessions = await db.collection("Sessions").findOne({token});

        if (!sessions) return res.status(401).send("Essa sessão não existe.");

        const user = await db.collection("Users").findOne({cpf: sessions.cpf});

        if (!user) return res.status(401).send("Esse usuário não existe.");

        res.locals.user = user; 
    } catch (e) {
        return res.sendStatus(500);
    }
    next();
}