import { Router } from "express";
import {getCategories, getBooksData, logout} from "../controllers/userController.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";


const userRouter = Router();

userRouter.get("/categories", getCategories);
userRouter.get("/books", getBooksData);
userRouter.delete("/logout", validateToken, logout);

export default userRouter;