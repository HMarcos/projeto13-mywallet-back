import bcrypt from "bcrypt"
import { v4 as uuid_v4 } from "uuid";

import { debug } from "./../logging/logging.js";

import db from "./../db.js";

const SALT_ROUNDS = 10;

export async function singUp(req, res) {

    const { name, email, password } = req.body;

    const register = {
        name,
        email,
        password: bcrypt.hashSync(password, SALT_ROUNDS),
        balance: 0
    }

    try {
        await db.collection("users").insertOne(register);

        console.log(debug("User registered succesfully..."));
        return res.status(201).send("User registered succesfully...");

    } catch (error) {
        console.log(error("Server Internal error... \n"), e);
        return res.sendStatus(500);
    }
}

export async function singIn(req, res) {

    const { user } = res.locals;

    const token = uuid_v4();

    try {
        const query = {
            token,
            userId: user._id
        }

        await db.collection("sessions").insertOne(query);
        console.log(debug("Session registered succesfully..."));

        const responseObject = {
            token,
            name: user.name
        };

        return res.status(200).send(responseObject);

    } catch (error) {
        console.log(error("Server Internal error... \n"), e);
        return res.sendStatus(500);
    }

}

export async function logout(req, res) {

    const { authorization } = req.headers;
    const token = authorization.replace("Bearer", "").trim();

    try {
        const query = {token};
        await db.collection("sessions").deleteOne(query);
        
        console.log(debug("Logout: Session finished..."));

        return res.status(200).send("Logged out user...");
        
    } catch (error) {
        console.log(error("Server Internal error... \n"), e);
        return res.sendStatus(500);
    }
}