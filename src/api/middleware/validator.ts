import { Request, Response, NextFunction } from "express";

export const validatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // --
  next();
};
