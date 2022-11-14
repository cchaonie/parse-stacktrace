import { useContext, useEffect, useState } from 'react';
import { createEditor } from 'slate';

import { Slate, Editable, withReact } from 'slate-react';
import { DocumentContext } from '../../model';
import { withSync } from '../../plugin/withSync';
import Message from '../Message';
import { Toolbar } from '../Toolbar';
import { EditorProps } from './type';

import './editor.css';
import { ShareDBDocStatus } from '../../model/core/type';
import FilesContext from '../../context/FilesContext';

export default ({ file: { name, content } }: EditorProps) => {
  const [editor] = useState(() => withSync(withReact(createEditor())));
  const [status, setStatus] = useState<ShareDBDocStatus>(
    ShareDBDocStatus.Loading
  );
  const clientDoc = useContext(DocumentContext);
  const { userId, connection } = useContext(FilesContext);

  useEffect(() => {
    const shareDBDoc = connection.get(userId, name);
    shareDBDoc.subscribe(error => {
      if (error) {
        setStatus(ShareDBDocStatus.LoadFailed);
      }

      if (!shareDBDoc.type) {
        shareDBDoc.create(content, error => {
          if (error) {
            setStatus(ShareDBDocStatus.LoadFailed);
          }
          setStatus(ShareDBDocStatus.Loaded);
        });
      } else {
        setStatus(ShareDBDocStatus.Loaded);
      }
    });
  }, []);

  const renderContent =
    status === ShareDBDocStatus.Loading ? (
      <Message>Loading......</Message>
    ) : status === ShareDBDocStatus.Loaded ? (
      <div className='editor'>
        <Toolbar />
        <Slate editor={editor} value={clientDoc.getDocumentData()}>
          <Editable style={{ flexGrow: 1, paddingInline: '8px' }} />
        </Slate>
      </div>
    ) : (
      <Message>
        Load shareDB document failed -_-!, please refresh you page
      </Message>
    );

  return renderContent;
};
