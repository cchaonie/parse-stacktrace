import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createEditor, Descendant } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
  ReactEditor,
} from 'slate-react';
import JSONFormatter from 'json-formatter-js';

import { withSync } from '../../plugins/withSync';
import Message from '../Message';
import { Toolbar } from '../Toolbar';
import { ShareDBDocStatus } from '../../models/core/type';
import { ClientDocument } from '../../models/core/clientDocument';
import { RenderElement } from '../RenderElement';
import { RenderLeaf } from '../RenderLeaf';
import { ConnectionContext, FilesContext } from '../../contexts';

import styles from './editor.css';

export default () => {
  const { files } = useContext(FilesContext);
  const { connection } = useContext(ConnectionContext);
  const { name, content, creator } = files.filter(f => f.active)?.[0];

  const clientDocRef = useRef(new ClientDocument());

  const codeBlockRef = useRef(null);

  const operationListener = useCallback(
    (currentData: Descendant[]) => {
      if (codeBlockRef.current && clientDocRef.current) {
        const parent = codeBlockRef.current;
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        }
        parent.appendChild(new JSONFormatter(currentData, Infinity).render());
      }
    },
    [codeBlockRef.current, clientDocRef.current]
  );

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
    const shareDBDoc = connection.get(creator, name);
    clientDocRef.current.shareDBDoc = shareDBDoc;

    shareDBDoc.addListener('load', () => {
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
        <Slate editor={editor} value={clientDocRef.current.getDocumentData()}>
          <Toolbar />
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            style={{ flexGrow: 1, paddingInline: '8px' }}
          />
        </Slate>
        <div className={styles.sourceCode} ref={codeBlockRef}></div>
      </div>
    ) : (
      <Message>
        Load shareDB document failed -_-!, please refresh you page
      </Message>
    );

  return renderContent;
};
