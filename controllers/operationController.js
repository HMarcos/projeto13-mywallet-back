import dayjs from "dayjs";

import db from "./../db.js";

import { debug, error } from "./../logging/logging.js";

export async function getOperations(req, res) {
    const { user } = res.locals;

    try {
        let query = { userId: user._id };
        const filter = { projection: { value: 1, type: 1, date: 1, description: 1, _id: 0 } };
        const operations = await db.collection("operations").find(query, filter).toArray();

        const balance = user.balance;

        const responseObject = {
            operations,
            balance
        }

        console.log(debug("Sending operations and balance status..."));
        return res.status(200).send(responseObject);

    } catch (e) {
        console.log(error("Server Internal error... \n"), e);
        return res.sendStatus(500);
    }
}

export async function setOperation(req, res) {
    const operation = req.body;
    const { user } = res.locals;

    try {
        let query = {
            value: Number(operation.value),
            type: operation.type,
            description: operation.description,
            date: dayjs().format("DD/MM"),
            userId: user._id
        }

        await db.collection("operations").insertOne(query);

        console.log(debug("Operation inserted on database..."));

        let updateOperation = null;
        if (operation.type === "incoming") {
            updateOperation = { $inc: { balance: parseFloat(operation.value) } };
        }
        else {
            updateOperation = { $inc: { balance: parseFloat(-operation.value) } };
        }

        query = { _id: user._id };

        await db.collection("users").updateOne(query, updateOperation);
        console.log(debug("User balance updated..."));

        return res.status(201).send("The operation was registered...");

    } catch (e) {
        console.log(error("Server Internal error... \n"), e);
        return res.sendStatus(500);
    }

}
