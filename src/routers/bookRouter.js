import { Router } from "express";
import { getBooksData, getCategories, getCategory } from "../controllers/bookController.js";

const bookRouter = Router();

bookRouter.get("/categories", getCategories);
bookRouter.get("/books", getBooksData);
bookRouter.get("/category/:categoryName", getCategory);

export default bookRouter;