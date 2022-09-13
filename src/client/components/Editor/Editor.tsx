import { useContext, useState } from 'react';
import { createEditor } from 'slate';

import { Slate, Editable, withReact } from 'slate-react';
import { DocumentContext } from '../../models';
import { LoadingStatus } from '../../models/types';
import Message from '../Message';
import { EditorProps } from './types';

export default ({ status }: EditorProps) => {
  const [editor] = useState(() => withReact(createEditor()));
  const clientDoc = useContext(DocumentContext);

  const handleSlateChange = () => {
    const isAstChange = editor.operations.some(
      op => 'set_selection' !== op.type
    );
    if (isAstChange) {
      clientDoc.submitOperations(editor.operations)
    }
  };

  const renderContent =
    status === LoadingStatus.Loading ? (
      <Message>Loading......</Message>
    ) : status === LoadingStatus.Loaded ? (
      <Slate
        editor={editor}
        value={clientDoc.getDocumentData()}
        onChange={handleSlateChange}
      >
        <Editable />
      </Slate>
    ) : (
      <Message>Loading failed -_-!, please refresh you page</Message>
    );

  return renderContent;
};
