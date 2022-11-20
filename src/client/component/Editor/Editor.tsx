import { useContext, useEffect, useRef, useState } from 'react';
import { createEditor } from 'slate';

import { Slate, Editable, withReact } from 'slate-react';
import { withSync } from '../../plugin/withSync';
import Message from '../Message';
import { Toolbar } from '../Toolbar';
import { EditorProps } from './type';

import styles from './editor.css';
import { ShareDBDocStatus } from '../../model/core/type';
import FilesContext from '../../context/FilesContext';
import { ClientDocument } from '../../model/core/clientDocument';

export default ({ file: { name, content, creator } }: EditorProps) => {
  const clientDocRef = useRef(new ClientDocument());
  const [editor] = useState(() =>
    withSync(clientDocRef.current)(withReact(createEditor()))
  );

  const [status, setStatus] = useState<ShareDBDocStatus>(
    ShareDBDocStatus.Loading
  );

  const { connection } = useContext(FilesContext);

  useEffect(() => {
    if (!connection) return;
    const shareDBDoc = connection.get(creator, name);
    clientDocRef.current.shareDBDoc = shareDBDoc;

    shareDBDoc.addListener('load', () => {
      console.log(shareDBDoc);
      if (!shareDBDoc.type) {
        shareDBDoc.create(content, error => {
          if (error) {
            setStatus(ShareDBDocStatus.LoadFailed);
          } else {
            setStatus(ShareDBDocStatus.Loaded);
          }
        });
      } else {
        setStatus(ShareDBDocStatus.Loaded);
      }
    });

    shareDBDoc.subscribe(error => {
      if (error) {
        setStatus(ShareDBDocStatus.LoadFailed);
      }
    });
  }, [creator, name, connection]);

  const renderContent =
    status === ShareDBDocStatus.Loading ? (
      <Message>Loading......</Message>
    ) : status === ShareDBDocStatus.Loaded ? (
      <div className={styles.editor}>
        <Toolbar />
        <Slate editor={editor} value={clientDocRef.current.getDocumentData()}>
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
