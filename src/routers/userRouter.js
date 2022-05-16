import { Router } from "express";
import {logout, addToShoppingCart, getShoppingCart} from "../controllers/userController.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";


const userRouter = Router();

userRouter.delete("/logout", validateToken, logout);
userRouter.post("/user/shoppingCart", validateToken, addToShoppingCart);
userRouter.get("/user/shoppingCart", validateToken, getShoppingCart);

export default userRouter;