import db from "./../db.js";

import { error, debug } from "./../logging/logging.js";

async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    if (!token) {
        console.log(error("Could not parse token..."));
        return res.status(401).send("Could not validate user, no token");
    }

    try {
        let query = { token }
        const session = await db.collection("sessions").findOne(query);

        if (!session) {
            console.log(error("Could not find a session..."));
            return res.status(401).send("Could not validate user, invalid token");
        }

        query = { _id: session.userId };
        const user = await db.collection("users").findOne(query);

        if (!user) {
            console.log(error("Could not find a user..."));
            return res.status(404).send("Could not validate user, invalid user");
        }

        res.locals.user = user;
        console.log(debug("Token is valid..."))
        next();

    } catch (e) {
        console.log(error("Server Internal error... \n"), e);
        return res.sendStatus(500);
    }


};

export default validateToken;