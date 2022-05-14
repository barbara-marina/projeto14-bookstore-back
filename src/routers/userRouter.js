import { Router } from "express";
import getCategories from "../controllers/userController.js";


const userRouter = Router();

userRouter.get("/categories", getCategories);

export default userRouter;