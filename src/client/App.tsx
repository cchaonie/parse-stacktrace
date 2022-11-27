import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AuthContainer, FilesContainer } from './containers';
import { Editor, SideMenu } from './components';

import styles from './app.css';
import ConnectionContainer from './containers/ConnectionContainer';

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
                element={<Editor />}
              />
            </Routes>
          </div>
        </FilesContainer>
      </ConnectionContainer>
    </AuthContainer>
  );
};
