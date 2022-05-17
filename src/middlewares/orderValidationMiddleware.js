import orderSchema from "./../schemas/orderSchema.js"

export default function validateOrder(req, res, next) {
    const validation = orderSchema.validate(req.body);
    if (validation.error) return res.status(422).send(validation.error);

    next();
}