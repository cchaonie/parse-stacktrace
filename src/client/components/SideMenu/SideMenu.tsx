import { useContext } from 'react';
import { AuthContext, FilesContext } from '../../contexts';
import Files from '../Files';
import MenuItem from './component/MenuItem';

import styles from './sideMenu.css';

export default () => {
  const { files } = useContext(FilesContext);
  const { userId } = useContext(AuthContext);

  return (
    <div className={`${styles.sideMenu} ${styles['sideMenu-background']}`}>
      <h1 className={styles['sideMenu-title']}>Collaborative Editor</h1>
      <div className={styles['sideMenu-operationSection']}>
        <MenuItem name='FILES'>
          <Files
            fileNames={files.filter(f => f.creator === userId).map(f => f.name)}
          />
        </MenuItem>
      </div>
    </div>
  );
};
