import { Router } from "express";
import {getCategories, getBooksData, logout, addToShoppingCart, getShoppingCart} from "../controllers/userController.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";


const userRouter = Router();

userRouter.get("/categories", getCategories);
userRouter.get("/books", getBooksData);
userRouter.delete("/logout", validateToken, logout);
userRouter.post("/user/shoppingCart", validateToken, addToShoppingCart);
userRouter.get("/user/shoppingCart", validateToken, getShoppingCart);

export default userRouter;