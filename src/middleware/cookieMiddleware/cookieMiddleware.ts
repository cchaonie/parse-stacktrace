import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';

export const cookieMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.cookies;
  console.log(uid);
  if (!uid) {
    res.cookie('uid', nanoid());
  }
  return next();
};
