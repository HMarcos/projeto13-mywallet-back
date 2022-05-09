import { Router } from "express";
import valitateRegister from "./../middlewares/registerMiddleware.js";
import validateLogin from "./../middlewares/loginMiddleware.js";
import { singUp, singIn } from "./../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", valitateRegister, singUp);
authRouter.post("/sign-in", validateLogin, singIn);

export default authRouter;