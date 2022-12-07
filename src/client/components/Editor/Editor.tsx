import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';
import _ from 'lodash';

import { withSync } from '../../plugins/withSync';
import { Message } from '../Message';
import { Toolbar } from '../Toolbar';
import { SourceView } from '../SourceView';
import { RenderElement } from '../RenderElement';
import { RenderLeaf } from '../RenderLeaf';
import { ConnectionContext, FilesContext } from '../../contexts';

import { ClientDocument, ClientDocumentEvents } from '../../models';
import { ShareDBDocStatus } from '../../models/core/type';

import styles from './editor.css';

export default () => {
  const { files } = useContext(FilesContext);
  const activeFile = files.filter(f => f.active)?.[0];

  const { connection } = useContext(ConnectionContext);

  const [source, setSource] = useState(activeFile.content);

  const clientDocRef = useRef(new ClientDocument());

  const operationListener = (currentData: Descendant[]) =>
    setSource(currentData);

  const [editor] = useState(() =>
    withSync(clientDocRef.current)(withReact(createEditor()), operationListener)
  );

  const [status, setStatus] = useState<ShareDBDocStatus>(
    ShareDBDocStatus.Loading
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => <RenderElement {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <RenderLeaf {...props} />,
    []
  );

  useEffect(() => {
    if (!connection) return;
    const { name, content, creator } = activeFile;

    const shareDBDoc = connection.get(creator, name);
    clientDocRef.current.shareDBDoc = shareDBDoc;

    // clientDocRef.current.addListener(
    //   ClientDocumentEvents.documentContentUpdate,
    //   doc => {
    //     setSource(_.cloneDeep(doc.data));
    //   }
    // );

    shareDBDoc.addListener('load', () => {
      if (!shareDBDoc.type) {
        shareDBDoc.create(content, error => {
          if (error) {
            setStatus(ShareDBDocStatus.LoadFailed);
          } else {
            setStatus(ShareDBDocStatus.Loaded);
            setSource(shareDBDoc.data);
          }
        });
      } else {
        setStatus(ShareDBDocStatus.Loaded);
        setSource(shareDBDoc.data);
      }
    });

    shareDBDoc.subscribe(error => {
      if (error) {
        setStatus(ShareDBDocStatus.LoadFailed);
      }
    });

    shareDBDoc.addListener('op', () => {
      console.log('new operation received');
      clientDocRef.current.dispatch(ClientDocumentEvents.documentContentUpdate);
    });
  }, [activeFile, connection]);

  const renderContent =
    status === ShareDBDocStatus.Loading ? (
      <Message>Loading......</Message>
    ) : status === ShareDBDocStatus.Loaded ? (
      <div className={styles.editor}>
        <Slate editor={editor} value={clientDocRef.current.getDocumentData()}>
          <Toolbar />
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            style={{ flexGrow: 1, paddingInline: '8px' }}
          />
          <SourceView data={source} />
        </Slate>
      </div>
    ) : (
      <Message>
        Load shareDB document failed -_-!, please refresh you page
      </Message>
    );

  return renderContent;
};
