import { Router } from "express";

import {login, register} from "./../controllers/authController.js";
import validateLogin from "./../middlewares/loginSchemaValidationMiddleware.js";
import validateRegister from "./../middlewares/registerSchemaValidationMiddleware.js"

const authRouter = Router();

authRouter.post("/login", validateLogin, login);

authRouter.post("/register", validateRegister, register);
export default authRouter;