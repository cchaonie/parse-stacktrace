import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Editor, SideMenu } from './components';
import FilesContext, { FilesContextValue } from './contexts/FilesContext';
import { UserStatus } from './models/core/type';
import FileDescription from './models/state/FileDescription';
import { getFingerprint } from './models/fingerprint/getFingerprint';
import { getShareDBConnection } from './models/core/getShareDBConnection';
import { useRequest } from './hooks/useRequest/useRequest';
import { parseUrl } from './utils/parseUrl';

import styles from './app.css';

export default () => {
  const location = useLocation();
  const [_, collectionId, documentName] = parseUrl(location.pathname);
  const [files, setFiles] = useState<FileDescription[]>(() => {
    if (collectionId && documentName) {
      const file = new FileDescription(documentName, collectionId, new Date());
      file.active = true;
      return [file];
    }
    return [];
  });
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
      <div id='board' className={styles.board}>
        <SideMenu />
        <Routes>
          <Route
            path='/'
            element={
              <div className={styles.welcome}>
                Create a new document from the side menu
              </div>
            }
          />
          <Route
            path='/document/:collectionId/:documentName'
            element={<Editor file={openedFile} />}
          />
        </Routes>
      </div>
    </FilesContext.Provider>
  );
};
