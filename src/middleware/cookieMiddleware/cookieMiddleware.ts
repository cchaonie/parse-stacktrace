import { NextFunction, Request, Response } from 'express';
import { v4, validate } from 'uuid';

export const cookieMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.cookies;
  console.log(uid);
  if (!uid || validate(uid)) {
    res.cookie('uid', v4());
  }
  return next();
};
