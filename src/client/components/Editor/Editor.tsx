import { useContext, useState } from 'react';
import { createEditor } from 'slate';

import { Slate, Editable, withReact } from 'slate-react';
import { DocumentContext } from '../../models';
import { LoadingStatus } from '../../models/types';
import { withSync } from '../../plugins/withSync';
import Message from '../Message';
import { Toolbar } from '../Toolbar';
import { EditorProps } from './types';

import './editor.css';

export default ({ status }: EditorProps) => {
  const [editor] = useState(() => withSync(withReact(createEditor())));

  const clientDoc = useContext(DocumentContext);

  const renderContent =
    status === LoadingStatus.Loading ? (
      <Message>Loading......</Message>
    ) : status === LoadingStatus.Loaded ? (
      <div className='editor'>
        <Toolbar />
        <Slate editor={editor} value={clientDoc.getDocumentData()}>
          <Editable style={{ flexGrow: 1, paddingInline: '8px' }} />
        </Slate>
      </div>
    ) : (
      <Message>Loading failed -_-!, please refresh you page</Message>
    );

  return renderContent;
};
