import express from "express";
import * as userController from "../controllers/userController";
import {
  validateCreateUser,
  validateBorrowBook,
  validateReturnBook,
} from "../validators/userValidator";

const router = express.Router();

router.get("/", userController.listUsers);

router.get("/:id", userController.getUserInfo);

router.post("/", validateCreateUser, userController.createUser);

router.post(
  "/:userId/borrow/:bookId",
  validateBorrowBook,
  userController.borrowBook
);

router.post(
  "/:userId/return/:bookId",
  validateReturnBook,
  userController.returnBook
);

export default router;
