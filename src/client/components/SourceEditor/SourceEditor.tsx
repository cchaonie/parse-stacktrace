import { useEffect, useRef, useState } from 'react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { Error } from 'sharedb';

import { withSync } from '../../plugins/withSync';
import { Message } from '../Message';
// import { SourceView } from './components/SourceView';

import { ClientDocument, ShareDBDocStatus, UserStatus } from '../../models';

import { Editor } from './components/Editor';

import { SourceEditorProps } from './type';

import styles from './sourceEditor.css';

export const SourceEditor = ({
  activeFile,
  connection,
  userStatus,
}: SourceEditorProps) => {
  const [source, setSource] = useState(activeFile.content);

  const clientDocRef = useRef(new ClientDocument());

  const [editor] = useState(() =>
    withSync(clientDocRef.current)(withReact(createEditor()))
  );

  const [status, setStatus] = useState<ShareDBDocStatus>(
    ShareDBDocStatus.Loading
  );

  useEffect(() => {
    if (!connection || userStatus !== UserStatus.LoggedIn) return;
    const { name, content, creator } = activeFile;

    const shareDBDoc = connection.get(creator, name);

    clientDocRef.current.shareDBDoc = shareDBDoc;

    const shareDBDocErrorHandler = (tag: string, error: Error) => {
      console.error(`[${tag}]: `, error);
      setStatus(ShareDBDocStatus.Error);
    };

    const shareDBDocUpdateHandler = (tag: string) => {
      console.log(`In [${tag}]`);
      setStatus(ShareDBDocStatus.Loaded);
      setSource(clientDocRef.current.getDocumentData());
    };

    shareDBDoc.subscribe(e => {
      if (e) {
        shareDBDocErrorHandler('SUBSCRIBE', e);
      } else {
        if (!shareDBDoc.type) {
          console.log('INFO:', 'create new doc now.');

          shareDBDoc.addListener('create', () =>
            shareDBDocUpdateHandler('CREATE')
          );

          shareDBDoc.create(content, e => {
            if (e) {
              shareDBDocErrorHandler('CREATE', e);
            }
          });
        } else {
          shareDBDocUpdateHandler('SUBSCRIBE');
        }
      }
    });

    shareDBDoc.addListener('load', () => shareDBDocUpdateHandler('LOAD'));

    shareDBDoc.addListener('op', () => shareDBDocUpdateHandler('OP'));

    shareDBDoc.addListener(
      'error',
      e => e && shareDBDocErrorHandler('GENERAL', e)
    );

    return () => {
      shareDBDoc.removeAllListeners();
      shareDBDoc.unsubscribe();
    };
  }, [activeFile, connection, userStatus]);

  return status === ShareDBDocStatus.Loading ? (
    <Message>Loading......</Message>
  ) : status === ShareDBDocStatus.Loaded ? (
    <div className={styles.sourceEditor}>
      <Editor
        key={JSON.stringify(source)}
        instance={editor}
        initialValue={source}
      />
      {/* <SourceView data={source} /> */}
    </div>
  ) : (
    <Message>
      Sorry, something wrong with shareDB document -_-!, please refresh you page
    </Message>
  );
};
