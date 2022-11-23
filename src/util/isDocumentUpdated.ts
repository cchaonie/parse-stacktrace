import { Operation } from 'slate';

export const isDocumentUpdated = (op: Operation) => {
  if (op.type === 'set_selection' || op.type === 'set_node') {
    return false;
  }
  return true;
};
