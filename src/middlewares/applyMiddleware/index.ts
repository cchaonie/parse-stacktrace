import { middleware } from "sharedb";

export const applyMiddleware = (
  context: middleware.ApplyContext,
  next: (err?: any) => void
) => {
  // implementation to be added
  next();
};
