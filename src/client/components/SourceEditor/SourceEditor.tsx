import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { withReact } from 'slate-react';

import { withSync } from '../../plugins/withSync';
import { Message } from '../Message';
import { SourceView } from './components/SourceView';

import { ClientDocument, ShareDBDocStatus, UserStatus } from '../../models';

import { Editor } from './components/Editor';

import { SourceEditorProps } from './type';

import styles from './sourceEditor.css';

export const SourceEditor = memo(
  ({ files, connection, userStatus }: SourceEditorProps) => {
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
      if (!connection || userStatus !== UserStatus.LoggedIn) return;
      const { name, content, creator } = activeFile;

      const shareDBDoc = connection.get(creator, name);
      clientDocRef.current.shareDBDoc = shareDBDoc;

      const shareDBDocErrorHandler = (tag: string, error: any) => {
        if (error) {
          console.error(`[${tag}]: `, error);
          setStatus(ShareDBDocStatus.Error);
        }
      };

      const shareDBDocUpdateHandler = (tag: string) => {
        console.log(`[${tag}]:`);
        setStatus(ShareDBDocStatus.Loaded);
        setSource(shareDBDoc.data);
      };

      shareDBDoc.subscribe(e => {
        shareDBDocErrorHandler('SUBSCRIBE', e);
        if (!shareDBDoc.type) {
          console.log('INFO:', 'create new doc now.');
          shareDBDoc.create(content, e => shareDBDocErrorHandler('CREATE', e));
          setSource(content);
        } else {
          shareDBDocUpdateHandler('SUBSCRIBE');
        }
      });

      shareDBDoc.addListener('load', () => shareDBDocUpdateHandler('LOAD'));

      shareDBDoc.addListener('op', () => shareDBDocUpdateHandler('OP'));

      shareDBDoc.addListener('error', e => shareDBDocErrorHandler('GENERAL', e));

      () => {
        console.log('SourceEditor is about to rerender');
        shareDBDoc.removeAllListeners();
      };
    }, [activeFile, connection, userStatus]);

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
        Sorry, something wrong with shareDB document -_-!, please refresh you
        page
      </Message>
    );
  }
);
