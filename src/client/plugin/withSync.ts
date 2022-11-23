import { Operation } from 'slate';
import { ReactEditor } from 'slate-react';
import { ClientDocument } from '../model/core/clientDocument';
import { isDocumentUpdated } from '~util/isDocumentUpdated';

export const withSync =
  (clientDocument: ClientDocument) =>
  (editor: ReactEditor): ReactEditor => {
    const { apply } = editor;

    editor.apply = (op: Operation) => {
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
    };

    return editor;
  };
