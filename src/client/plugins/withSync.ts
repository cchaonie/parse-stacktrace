import { Operation } from 'slate';
import { ReactEditor } from 'slate-react';
import { clientDocument } from '../models';

export const withSync = (editor: ReactEditor): ReactEditor => {
  const { apply } = editor;

  editor.apply = (op: Operation) => {
    clientDocument.submitOperation(op);

    apply(op);
  };

  return editor;
};
