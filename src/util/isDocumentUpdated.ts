import { Operation } from 'slate';

export const isDocumentUpdated = (op: Operation) => {
  if (op.type === 'set_selection') {
    return false;
  }
  return true;
};
