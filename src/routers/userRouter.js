import { Router } from "express";
import {logout, addToShoppingCart, getShoppingCart, deleteBook} from "../controllers/userController.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";


const userRouter = Router();

userRouter.delete("/logout", validateToken, logout);
userRouter.post("/user/shoppingCart", validateToken, addToShoppingCart);
userRouter.get("/user/shoppingCart", validateToken, getShoppingCart);
userRouter.delete("/user/deleteBook/:bookId", validateToken, deleteBook);

export default userRouter;