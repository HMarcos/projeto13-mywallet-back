import joi from "joi";

const operationSchema = joi.object({
    value: joi.number().min(0).required(),
    type: joi.string().valid("incoming", "outgoing").required(),
    description: joi.string().required()
});

export default operationSchema;