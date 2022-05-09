import bcrypt from "bcrypt";

import db from "./../db.js";

import loginSchema from "./../schemas/loginSchema.js";
import { error } from "./../logging/logging.js";

export default async function validateLogin(req, res, next) {

    const login = req.body;

    const loginValidation = loginSchema.validate(login, { abortEarly: false });

    if (loginValidation.error) {
        const validationErros = loginValidation.error.details.map(detail => detail.message);

        console.log(error("Validation errors: "), validationErros);
        return res.status(422).send(validationErros);
    }

    try {
        const query = { email: login.email };
        const user = await db.collection("users").findOne(query);

        if (!user) {
            console.log(error("User is incorrect..."));
            return res.status(404).send("User is incorrect");
        }

        if (user && !bcrypt.compareSync(login.password, user.password)) {
            console.log(error("Password is incorrect..."));
            return res.status(404).send("Password is incorrect");
        }

        res.locals.user = user;

        next();
    } catch (e) {
        console.log(error("Server Internal error... \n"), e);
        return res.sendStatus(500);
    }
}