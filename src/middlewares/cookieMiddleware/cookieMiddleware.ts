import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";

export const cookieMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.cookies;
  if (!uid) {
    res.cookie("uid", nanoid());
  }
  return next();
};
