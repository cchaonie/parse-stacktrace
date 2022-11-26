import { NextFunction, Request, Response } from 'express';
import path from 'path';

export const baseFileMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pathSegments = req.path.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];
  const fileExtension = lastSegment.split('.')[1];

  if (fileExtension) {
    if (fileExtension === 'txt') {
      return res.sendFile(
        path.resolve(process.cwd(), `dist/client/index.html`)
      );
    }
    return res.sendFile(
      path.resolve(process.cwd(), `dist/client/${lastSegment}`)
    );
  }
  return next();
};
