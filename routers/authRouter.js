import { Router } from "express";
import valitateRegister from "./../middlewares/registerMiddleware.js";
import validateLogin from "./../middlewares/loginMiddleware.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import { singUp, singIn, logout } from "./../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", valitateRegister, singUp);
authRouter.post("/sign-in", validateLogin, singIn);
authRouter.delete("/logout", validateToken, logout);

export default authRouter;