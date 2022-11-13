import { useEffect, useState } from 'react';
import { Editor, SideMenu, SyncDocument } from './component';

import './app.css';
import { LoadingStatus, UserStatus } from './model/core/type';
import FilesContext, { FilesContextValue } from './context/FilesContext';
import FileDescription from './model/state/FileDescription';
import { getFingerprint } from './model/fingerprint/getFingerprint';

export default () => {
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.Loading);
  const [files, setFiles] = useState<FileDescription[]>([]);
  const [userId, setUserId] = useState(undefined);
  const [userStatus, setUserStatus] = useState(UserStatus.NotLoggedIn);

  const initialFilesContext: FilesContextValue = {
    userId,
    userStatus,
    files,
    setFiles,
  };

  const hasDocOpen = files.some(f => f.active);

  useEffect(() => {
    getFingerprint().then(({ visitorId }) => {
      setUserId(visitorId);
      fetch('/login', {
        method: 'POST',
      })
        .then(res => {
          if (res.ok) {
            setUserStatus(UserStatus.LoggedIn);
            console.log(`Visitor: ${visitorId} log in successfully`);
          }
        })
        .catch(e => console.error(e));
    });
  }, []);

  return (
    <FilesContext.Provider value={initialFilesContext}>
      <div id='board'>
        <SideMenu />
        {hasDocOpen ? (
          <SyncDocument onStatusChange={status => setStatus(status)}>
            <Editor status={status} />
          </SyncDocument>
        ) : (
          <div className='welcome'>Create a new document from the side menu</div>
        )}
      </div>
    </FilesContext.Provider>
  );
};
