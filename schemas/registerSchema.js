import joi from "joi";

const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    confirmation_password: joi.string().valid(joi.ref('password')).required().messages(
        { 'any.only': '{{#label}} does not match' }
    )
});

export default registerSchema;