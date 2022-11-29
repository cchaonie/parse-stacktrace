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
import { SourceView } from '../SourceView';

export default () => {
  const { files } = useContext(FilesContext);
  const { connection } = useContext(ConnectionContext);
  const { name, content, creator } = files.filter(f => f.active)?.[0];
  const [source, setSource] = useState(content);

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
    const shareDBDoc = connection.get(creator, name);
    clientDocRef.current.shareDBDoc = shareDBDoc;

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
