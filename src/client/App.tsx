import { useEffect, useState } from 'react';

import { Editor, SideMenu } from './component';
import { UserStatus } from './model/core/type';
import FilesContext, { FilesContextValue } from './context/FilesContext';
import FileDescription from './model/state/FileDescription';
import { getFingerprint } from './model/fingerprint/getFingerprint';
import { getShareDBConnection } from './model/core/getShareDBConnection';

import './app.css';
import { useRequest } from './hooks/useRequest/useRequest';

export default () => {
  const [files, setFiles] = useState<FileDescription[]>([]);
  const [userId, setUserId] = useState('');
  const [userStatus, setUserStatus] = useState(UserStatus.NotLoggedIn);
  const [connection, setConnection] = useState(null);

  const initialFilesContext: FilesContextValue = {
    userId,
    userStatus,
    files,
    connection,
    setFiles,
  };

  const openedFile = files.filter(f => f.active)?.[0];

  useEffect(() => {
    getFingerprint()
      .then(({ visitorId }) => {
        setUserId(visitorId);
        console.log(`Visitor: ${visitorId}`);
      })
      .catch(e => console.error(`Getting fingerprint failed`, e));
  }, []);

  useRequest(
    {
      url: '/login',
      initOptions: {
        method: 'POST',
      },
    },
    res => {
      if (res.ok) {
        setUserStatus(UserStatus.LoggedIn);
        console.log(`User login successfully`);
      }
    },
    e => console.error(`User login failed`, e)
  );

  useEffect(() => {
    setConnection(getShareDBConnection());
  }, []);

  return (
    <FilesContext.Provider value={initialFilesContext}>
      <div id='board'>
        <SideMenu />
        {!!openedFile ? (
          <Editor file={openedFile} />
        ) : (
          <div className='welcome'>Create a new document from the side menu</div>
        )}
      </div>
    </FilesContext.Provider>
  );
};
