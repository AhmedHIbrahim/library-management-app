import express from "express";
import * as bookController from "../controllers/bookController";
import { validateCreateBook } from "../validators/bookValidator";

const router = express.Router();

router.get("/", bookController.listBooks);
router.get("/:id", bookController.getBookInfo);
router.post("/", validateCreateBook, bookController.createBook);

export default router;
