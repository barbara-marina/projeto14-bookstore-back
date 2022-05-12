import { Router } from "express";
import login from "./../controllers/authController.js";
import validateLogin from "./../middlewares/loginSchemaValidationMiddleware.js";

const authRouter = Router();

authRouter.post("/login", validateLogin, login);

export default authRouter;