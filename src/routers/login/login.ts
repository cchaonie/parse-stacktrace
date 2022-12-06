import { Router } from 'express';

export const loginRoute = Router();

loginRoute.use('/login', (_, res) => {
  res.status(200).json({
    message: 'OK',
  });
});
