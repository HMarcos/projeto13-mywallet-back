import { MongoClient } from "mongodb";
import dotenv from "dotenv";

import {debug, error} from "./logging/logging.js"

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.DATABASE);
    console.log(debug("Connection to MongoDB database successful..."))
} catch (e) {
    console.log(error("Error connecting to MongoDB database....\n"), e);
    process.exit();
}

export default db;