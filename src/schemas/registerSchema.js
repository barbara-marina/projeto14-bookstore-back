import joi from "joi";

const registerSchema = joi.object({
    cpf: joi.string().regex(/^\d{11}$/).required(),
    email: joi.string().email().required(),
    nome: joi.string().required(),
    senha: joi.string().alphanum().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required()

});

export default registerSchema;