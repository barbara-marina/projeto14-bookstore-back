import { Router } from "express";
import authRouter from "./authRouter.js";
import bookRouter from "./bookRouter.js";
import userRouter from "./userRouter.js";

const router= Router();

router.use(authRouter);
router.use(userRouter);
router.use(bookRouter);

export default router;