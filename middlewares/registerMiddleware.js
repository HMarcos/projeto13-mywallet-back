import db from "../db.js";

import registerSchema from "./../schemas/registerSchema.js";
import { error } from "./../logging/logging.js";


async function valitateRegister(req, res, next) {

    const register = req.body;

    const registerValidation = registerSchema.validate(register, { abortEarly: false });

    if (registerValidation.error) {
        const validationErrors = registerValidation.error.details.map(detail => detail.message);
        console.log(error(`Validation errors: `), validationErrors);
        return res.status(422).send(validationErrors);
    }

    try {
        const query = { email: register.email };
        const user = await db.collection("users").findOne(query);

        if (user) {
            console.log(error("User already registered..."));
            return res.status(409).send("User already registered");
        }

        next();
    } catch (e) {
        console.log(error("Server Internal error... \n"), e);
        return res.sendStatus(500);
    }
}

export default valitateRegister;