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
          throw new Error(
            'The related shareDBDoc has not been initialized yet.'
          );
        }
        clientDocument.submitOperation(op);
      }

      apply(op);
    };

    return editor;
  };
