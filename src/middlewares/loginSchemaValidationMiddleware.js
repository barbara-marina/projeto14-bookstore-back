import loginSchema from "./../schemas/loginSchema.js"

export default function validateLogin(req, res, next) {
    const validation = loginSchema.validate(req.body);
    if (validation.error) return res.status(422).send("Formato indevido.");

    next();
}