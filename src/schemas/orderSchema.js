import joi from "joi";

const orderSchema = joi.object(
    {nome: joi.string().required(),
    cpf: joi.string().regex(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/).required(),
    endereco: joi.string().required(),
    bairro: joi.string().required(),
    cidade: joi.string().required(),
    uf: joi.string().required(),
    cep: joi.string().regex(/^[0-9]{5}-[0-9]{3}$/).required(),
    pagamento:joi.string().required(),
    pedido: joi.object()
});

export default orderSchema;