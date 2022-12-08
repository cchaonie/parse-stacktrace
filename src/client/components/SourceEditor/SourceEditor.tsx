import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { withReact } from 'slate-react';

import { withSync } from '../../plugins/withSync';
import { Message } from '../Message';
import { SourceView } from './components/SourceView';

import { ClientDocument, ShareDBDocStatus } from '../../models';

import { Editor } from './components/Editor';

import { SourceEditorProps } from './type';

import styles from './sourceEditor.css';

export const SourceEditor = memo(({ files, connection }: SourceEditorProps) => {
  const activeFile = useMemo(() => files.filter(f => f.active)?.[0], [files]);

  const [source, setSource] = useState(activeFile.content);

  const clientDocRef = useRef(new ClientDocument());

  const [editor] = useState(() =>
    withSync(clientDocRef.current)(withReact(createEditor()))
  );

  const [status, setStatus] = useState<ShareDBDocStatus>(
    ShareDBDocStatus.Loading
  );

  useEffect(() => {
    if (!connection) return;
    const { name, content, creator } = activeFile;

    const shareDBDoc = connection.get(creator, name);
    clientDocRef.current.shareDBDoc = shareDBDoc;

    const shareDBDocErrorHandler = (error, tag: string) => {
      console.error(`[${tag}]: `, error);
      setStatus(ShareDBDocStatus.Error);
    };

    if (!shareDBDoc.data) {
      console.log('INFO:', 'create new doc now.');
      shareDBDoc.create(content, e => shareDBDocErrorHandler(e, 'CREATE'));
      setSource(content);
    } else {
      setStatus(ShareDBDocStatus.Loaded);
      setSource(shareDBDoc.data);
    }

    shareDBDoc.addListener('op', () => {
      setSource(shareDBDoc.data);
    });

    shareDBDoc.addListener('error', e => shareDBDocErrorHandler(e, 'GENERAL'));
  }, [activeFile, connection]);

  return status === ShareDBDocStatus.Loading ? (
    <Message>Loading......</Message>
  ) : status === ShareDBDocStatus.Loaded ? (
    <div className={styles.sourceEditor}>
      <Editor
        instance={editor}
        initialValue={clientDocRef.current.getDocumentData()}
      />
      <SourceView data={source} />
    </div>
  ) : (
    <Message>
      Sorry, something wrong with shareDB document -_-!, please refresh you page
    </Message>
  );
});
