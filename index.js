import express, { json }  from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./db.js";
import { info } from "./logging/logging.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());


// Listen the application
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(info(`Application is running on the PORT ${PORT}...`));
})