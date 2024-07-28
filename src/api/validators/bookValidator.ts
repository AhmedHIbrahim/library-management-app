import { Request, Response, NextFunction } from "express";

export const validateCreateBook = (
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
