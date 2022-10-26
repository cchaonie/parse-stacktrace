import { Operation } from 'slate';
import { ReactEditor } from 'slate-react';
import { clientDocument } from '../models';
import { isDocumentUpdated } from '../../utils/isDocumentUpdated';

export const withSync = (editor: ReactEditor): ReactEditor => {
  const { apply } = editor;

  editor.apply = (op: Operation) => {
    console.log(op);
    if (isDocumentUpdated(op)) {
      // send to server
      clientDocument.submitOperation(op);
    }

    apply(op);

    console.log(editor.children);
  };

  return editor;
};
