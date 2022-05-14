import { Router } from "express";
import {getCategories, getBooksData} from "../controllers/userController.js";


const userRouter = Router();

userRouter.get("/categories", getCategories);
userRouter.get("/books", getBooksData);

export default userRouter;