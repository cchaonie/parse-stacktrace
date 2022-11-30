import { middleware } from 'sharedb';

export const applyMiddleware = (
  context: middleware.ApplyContext,
  next: (err?: any) => void
) => {
  console.log(Object.keys(context));
  next();
};
