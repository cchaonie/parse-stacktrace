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

  const handleEditorChange = e => {
    console.log(e);
    console.log(editor);
  };
  const handleKeyDown = event => {
    if (event.key === '&') {
      event.preventDefault();
      editor.insertText('and');
    }
  };

  const renderContent =
    status === LoadingStatus.Loading ? (
      <Message>Loading......</Message>
    ) : status === LoadingStatus.Loaded ? (
      <Slate
        onChange={handleEditorChange}
        editor={editor}
        value={clientDoc.sharedbDoc.data}
      >
        <Editable onKeyDown={handleKeyDown} />
      </Slate>
    ) : (
      <Message>Loading failed -_-!, please refresh you page</Message>
    );

  return renderContent;
};
