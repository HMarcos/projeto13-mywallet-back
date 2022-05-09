import { Router } from "express";
import validateToken from "./../middlewares/tokenMiddleware.js";
import { getOperations, setOperation } from "./../controllers/operationController.js";

const operationRouter = Router();

operationRouter.use(validateToken);

operationRouter.get("/operations", getOperations);
operationRouter.post("/operations", setOperation);

export default operationRouter;