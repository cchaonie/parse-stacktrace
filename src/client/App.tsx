import { Route, Routes } from 'react-router-dom';

import {
  AuthContainer,
  ConnectionContainer,
  FilesContainer,
} from './containers';
import { SourceEditor, SideMenu, SourceEditorConnect } from './components';

import styles from './app.css';

export default () => {
  return (
    <AuthContainer>
      <ConnectionContainer>
        <FilesContainer>
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
                element={
                  <SourceEditorConnect>
                    {({ files, connection }) => (
                      <SourceEditor files={files} connection={connection} />
                    )}
                  </SourceEditorConnect>
                }
              />
            </Routes>
          </div>
        </FilesContainer>
      </ConnectionContainer>
    </AuthContainer>
  );
};
