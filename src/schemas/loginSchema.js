import joi from "joi";

const loginSchema = joi.object({
    email: joi.string().email().required(),
    hash: joi.string().alphanum().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required()
});

export default loginSchema;