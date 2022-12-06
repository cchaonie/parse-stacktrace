import { Descendant, Operation } from 'slate';
import { ReactEditor } from 'slate-react';
import { ClientDocument } from '../models/core/clientDocument';
import { isDocumentUpdated } from '../utils/isDocumentUpdated';

export const withSync =
  (clientDocument: ClientDocument) =>
  (
    editor: ReactEditor,
    operationListener: (editor: Descendant[]) => void
  ): ReactEditor => {
    const { apply } = editor;

    editor.apply = (op: Operation) => {
      // console.log('[Operation]', op);
      // console.log('[editor.children]', editor.children);
      if (isDocumentUpdated(op)) {
        // send to server
        if (!clientDocument.shareDBDoc) {
          console.error('The related shareDBDoc has not been initialized yet.');
        }
        try {
          clientDocument.submitOperation(op);
        } catch (error) {
          console.error(error);
        }
      }

      apply(op);
      operationListener(editor.children);
    };

    return editor;
  };
