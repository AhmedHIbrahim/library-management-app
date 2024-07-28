import { Request, Response, NextFunction } from "express";
import validator from "validator";

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ message: "Valid name is required" });
  }

  next();
};

export const validateBorrowBook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, bookId } = req.params;

  if (!userId || !validator.isInt(userId)) {
    return res.status(400).json({ message: "Valid userId is required" });
  }

  if (!bookId || !validator.isInt(bookId)) {
    return res.status(400).json({ message: "Valid bookId is required" });
  }

  next();
};

export const validateReturnBook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, bookId } = req.params;
  const { score } = req.body;

  if (!userId || !validator.isInt(userId)) {
    return res.status(400).json({ message: "Valid userId is required" });
  }

  if (!bookId || !validator.isInt(bookId)) {
    return res.status(400).json({ message: "Valid bookId is required" });
  }

  if (
    score !== undefined &&
    !validator.isInt(score.toString(), { min: 1, max: 10 })
  ) {
    return res
      .status(400)
      .json({ message: "Score must be a number between 1 and 10" });
  }

  next();
};
